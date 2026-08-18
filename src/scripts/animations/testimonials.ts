import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './hero';

gsap.registerPlugin(ScrollTrigger);

function wrappedOffset(i: number, index: number, total: number) {
  let delta = i - index;
  const half = total / 2;
  if (delta > half) delta -= total;
  if (delta < -half) delta += total;
  return delta;
}

export function initTestimonialsSlider() {
  const pinTarget = document.querySelector<HTMLElement>('[data-testimonial-pin]');
  const root = document.querySelector<HTMLElement>('[data-testimonial-slider]');
  const viewport = root?.querySelector<HTMLElement>('[data-testimonial-viewport]');
  const slides = Array.from(root?.querySelectorAll<HTMLElement>('[data-testimonial-slide]') ?? []);
  if (!root || !viewport || slides.length < 2) return () => {};

  let index = 0;
  let startX = 0;
  let pinned = false;
  const reduced = prefersReducedMotion();
  const last = slides.length - 1;

  const layout = (animate: boolean) => {
    const vw = viewport.clientWidth;
    const cardW = slides[0].offsetWidth || Math.min(560, vw * 0.78);
    const gap = Math.min(28, vw * 0.03);
    const center = (vw - cardW) / 2;
    const duration = !animate || reduced ? 0 : 0.32;

    slides.forEach((slide, i) => {
      const offset = wrappedOffset(i, index, slides.length);
      const abs = Math.abs(offset);
      const isActive = offset === 0;

      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      slide.style.pointerEvents = abs <= 1 ? 'auto' : 'none';

      gsap.to(slide, {
        x: center + offset * (cardW * 0.58 + gap),
        y: abs === 0 ? 0 : 24,
        rotateY: offset * -10,
        scale: abs === 0 ? 1 : abs === 1 ? 0.86 : 0.72,
        opacity: abs === 0 ? 1 : abs === 1 ? 0.38 : 0,
        zIndex: 20 - abs * 4,
        duration,
        ease: 'power3.out',
        overwrite: true,
      });
    });
  };

  const setIndex = (nextIndex: number, animate = true) => {
    const next = pinned
      ? Math.max(0, Math.min(last, nextIndex))
      : (nextIndex + slides.length) % slides.length;
    if (next === index) return;
    index = next;
    layout(animate);

    const active = slides[index];
    const quote = active.querySelector('.testimonials__quote');
    const person = active.querySelector('.testimonials__person');
    if (animate && !reduced && quote && person) {
      gsap.fromTo(
        [quote, person],
        { y: 10, opacity: 0.2 },
        { y: 0, opacity: 1, duration: 0.28, stagger: 0.04, ease: 'power3.out' },
      );
    }
  };

  let pinTrigger: ScrollTrigger | null = null;

  const onSlideClick = (event: Event) => {
    const nextIndex = slides.indexOf(event.currentTarget as HTMLElement);
    if (nextIndex < 0 || nextIndex === index) return;
    if (pinTrigger?.isActive) {
      const progress = last === 0 ? 0 : nextIndex / last;
      pinTrigger.scroll(pinTrigger.start + (pinTrigger.end - pinTrigger.start) * progress);
      return;
    }
    setIndex(nextIndex, true);
  };
  const onPointerDown = (event: PointerEvent) => {
    startX = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    const delta = event.clientX - startX;
    if (Math.abs(delta) < 42) return;
    setIndex(delta > 0 ? index - 1 : index + 1, true);
  };
  const onResize = () => layout(false);

  gsap.set(viewport, { transformPerspective: 1400 });
  layout(false);

  if (!reduced && pinTarget) {
    pinTrigger = ScrollTrigger.create({
      trigger: pinTarget,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * 0.76)}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        pinned = self.isActive;
        layout(true);
      },
      onUpdate: (self) => {
        setIndex(Math.round(self.progress * last), true);
      },
      onLeave: () => {
        pinned = false;
        setIndex(last, true);
      },
      onLeaveBack: () => {
        pinned = false;
        setIndex(0, true);
      },
    });
  }

  slides.forEach((slide) => slide.addEventListener('click', onSlideClick));
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointerup', onPointerUp);
  window.addEventListener('resize', onResize);

  return () => {
    pinTrigger?.kill();
    slides.forEach((slide) => slide.removeEventListener('click', onSlideClick));
    viewport.removeEventListener('pointerdown', onPointerDown);
    viewport.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('resize', onResize);
  };
}
