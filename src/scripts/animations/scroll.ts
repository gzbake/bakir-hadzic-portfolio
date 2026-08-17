import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './hero';

gsap.registerPlugin(ScrollTrigger);

export function initScroll() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.reveal').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
    });
    return () => {};
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal="up"], [data-reveal]').forEach((el) => {
    if (
      el.hasAttribute('data-stagger') ||
      el.hasAttribute('data-work') ||
      el.hasAttribute('data-hero') ||
      el.hasAttribute('data-contact')
    ) {
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        },
      },
    );
  });

  document.querySelectorAll('section').forEach((section) => {
    if (section.id === 'contact') return;
    const items = section.querySelectorAll<HTMLElement>('[data-stagger]');
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: 'top 76%',
        },
      },
    );
  });

  const contact = document.getElementById('contact');
  if (contact) {
    const kicker = contact.querySelector<HTMLElement>('[data-contact="kicker"]');
    const heading = contact.querySelector<HTMLElement>('[data-contact="heading"]');
    const lead = contact.querySelector<HTMLElement>('[data-contact="lead"]');
    const rows = contact.querySelectorAll<HTMLElement>('[data-contact="row"]');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contact,
        start: 'top 78%',
      },
    });

    if (kicker) tl.fromTo(kicker, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    if (heading) tl.fromTo(heading, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.45');
    if (lead) tl.fromTo(lead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45');
    if (rows.length) {
      tl.fromTo(
        rows,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.09 },
        '-=0.28',
      );
    }
  }

  gsap.utils.toArray<HTMLElement>('[data-work]').forEach((item, i) => {
    const frame = item.querySelector('.work__frame');

    gsap.fromTo(
      item,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
        },
      },
    );

    if (frame && !frame.classList.contains('mockup--phone')) {
      gsap.fromTo(
        frame,
        {
          clipPath: i % 2 === 0 ? 'inset(10% 8% 10% 8%)' : 'inset(14% 0 0 0)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
          },
        },
      );
    }
  });

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
