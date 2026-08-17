import { prefersReducedMotion } from './hero';

export function initNavigation() {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('mobile-nav');
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));

  const onScroll = () => {
    nav?.classList.toggle('is-solid', window.scrollY > 12);

    const y = window.scrollY + window.innerHeight * 0.35;
    let current = '';
    for (const section of sections) {
      if (section.offsetTop <= y) current = `#${section.id}`;
    }
    links.forEach((link) => {
      const hash = link.dataset.navLink || '';
      link.classList.toggle('is-active', hash === current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.classList.toggle('is-open', !open);
    mobile?.classList.toggle('is-open', !open);
    if (mobile) mobile.hidden = open;
  });

  mobile?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.classList.remove('is-open');
      mobile?.classList.remove('is-open');
      mobile.hidden = true;
    });
  });

  if (!prefersReducedMotion()) {
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-1px)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
      });
    });
  }

  return () => window.removeEventListener('scroll', onScroll);
}
