import gsap from 'gsap';

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function revealHero() {
  const media = document.querySelector<HTMLElement>('[data-hero="media"]');
  const img = document.querySelector<HTMLElement>('[data-hero-img]');
  const copy = document.querySelectorAll<HTMLElement>('[data-hero]:not([data-hero="media"])');
  const nav = document.getElementById('site-nav');

  if (prefersReducedMotion()) {
    document.querySelectorAll('[data-hero], [data-hero-img]').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.clipPath = 'none';
    });
    return;
  }

  if (nav) {
    gsap.fromTo(nav, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: 'power3.out' });
  }

  if (media && img) {
    gsap.fromTo(
      media,
      { clipPath: 'inset(12% 12% 12% 12%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.out' },
    );
    gsap.fromTo(
      img,
      { scale: 1.03, opacity: 0.75 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
    );
  }

  gsap.fromTo(
    copy,
    { opacity: 0, y: 22 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.18,
    },
  );
}

export function initHeroParallax() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return () => {};

  const media = document.querySelector<HTMLElement>('[data-hero="media"]');
  const img = document.querySelector<HTMLElement>('[data-hero-img]');
  if (!media || !img) return () => {};

  const onMove = (e: PointerEvent) => {
    const rect = media.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    img.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
  };

  const reset = () => {
    img.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    img.style.transform = '';
  };

  media.addEventListener('pointermove', onMove);
  media.addEventListener('pointerleave', reset);
  media.addEventListener('pointerenter', () => {
    img.style.transition = 'transform 0.2s ease-out';
  });

  return () => {
    media.removeEventListener('pointermove', onMove);
    media.removeEventListener('pointerleave', reset);
  };
}
