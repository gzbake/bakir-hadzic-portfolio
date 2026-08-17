import { prefersReducedMotion } from './hero';

export function initButtons() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  const magnets = document.querySelectorAll<HTMLElement>('.js-magnet');

  magnets.forEach((el) => {
    const strength = 10;
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    });
    el.addEventListener('pointerenter', () => {
      el.style.transition = 'transform 0.12s ease-out';
    });
  });
}
