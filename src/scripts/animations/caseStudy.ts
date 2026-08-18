import gsap from 'gsap';
import { prefersReducedMotion } from './hero';

export function initCaseCategories() {
  const root = document.getElementById('inat');
  if (!root) return () => {};

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-case-cat]'));
  const heading = root.querySelector<HTMLElement>('[data-case-copy-heading]');
  const body = root.querySelector<HTMLElement>('[data-case-copy-body]');
  if (!buttons.length || !heading || !body) return () => {};

  let current = buttons.find((btn) => btn.getAttribute('aria-pressed') === 'true') ?? buttons[0];
  let busy = false;
  const reduced = prefersReducedMotion();

  const setCopy = (btn: HTMLButtonElement) => {
    heading.textContent = btn.dataset.heading ?? '';
    body.textContent = btn.dataset.body ?? '';
  };

  const activate = (btn: HTMLButtonElement) => {
    if (btn === current || busy) return;
    busy = true;
    const previous = current;
    current = btn;

    previous.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-pressed', 'true');

    if (reduced) {
      setCopy(btn);
      busy = false;
      return;
    }

    gsap.fromTo(
      btn,
      { scale: 1 },
      {
        scale: 1.06,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(btn, { clearProps: 'transform' });
        },
      },
    );

    const tl = gsap.timeline({
      onComplete: () => {
        busy = false;
      },
    });
    tl.to([heading, body], { opacity: 0, y: -6, duration: 0.18, ease: 'power2.in' });
    tl.add(() => setCopy(btn));
    tl.fromTo(
      [heading, body],
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power3.out', stagger: 0.04 },
    );
  };

  const onClick = (event: Event) => {
    activate(event.currentTarget as HTMLButtonElement);
  };

  buttons.forEach((btn) => btn.addEventListener('click', onClick));

  return () => {
    buttons.forEach((btn) => btn.removeEventListener('click', onClick));
  };
}

export function initCaseSlider() {
  const root = document.querySelector<HTMLElement>('[data-case-slider]');
  const track = root?.querySelector<HTMLElement>('[data-case-track]');
  const prev = root?.querySelector<HTMLButtonElement>('[data-case-prev]');
  const next = root?.querySelector<HTMLButtonElement>('[data-case-next]');
  const dots = Array.from(root?.querySelectorAll<HTMLButtonElement>('[data-case-dot]') ?? []);
  const slides = Array.from(root?.querySelectorAll<HTMLElement>('[data-case-slide]') ?? []);
  if (!root || !track || !prev || !next || slides.length < 2) return () => {};

  let index = 0;
  const reduced = prefersReducedMotion();
  let startX = 0;
  root.tabIndex = 0;

  const goTo = (nextIndex: number) => {
    index = (nextIndex + slides.length) % slides.length;
    gsap.to(track, {
      xPercent: -100 * index,
      duration: reduced ? 0 : 0.55,
      ease: 'power3.out',
      overwrite: true,
    });
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  };

  const onPrev = () => goTo(index - 1);
  const onNext = () => goTo(index + 1);
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') onPrev();
    if (event.key === 'ArrowRight') onNext();
  };
  const onPointerDown = (event: PointerEvent) => {
    startX = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    const delta = event.clientX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) onPrev();
    else onNext();
  };

  prev.addEventListener('click', onPrev);
  next.addEventListener('click', onNext);
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  root.addEventListener('keydown', onKey);
  root.addEventListener('pointerdown', onPointerDown);
  root.addEventListener('pointerup', onPointerUp);

  return () => {
    prev.removeEventListener('click', onPrev);
    next.removeEventListener('click', onNext);
    root.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerdown', onPointerDown);
    root.removeEventListener('pointerup', onPointerUp);
  };
}
