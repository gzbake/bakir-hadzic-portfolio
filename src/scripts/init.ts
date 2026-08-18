import { revealHero, initHeroParallax } from './animations/hero';
import { initScroll } from './animations/scroll';
import { initNavigation } from './animations/navigation';
import { initButtons } from './animations/buttons';
import { initCaseCategories, initCaseSlider } from './animations/caseStudy';
import { createBackground } from './webgl/background';

function boot() {
  const cleanups = [
    initNavigation(),
    initScroll(),
    createBackground(),
    initHeroParallax(),
    initCaseCategories(),
    initCaseSlider(),
  ];

  revealHero();
  initButtons();

  document.addEventListener('astro:before-swap', () => {
    cleanups.forEach((fn) => fn?.());
  }, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
