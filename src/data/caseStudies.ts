export interface CaseStudy {
  slug: string;
  title: string;
  kicker: string;
  heroImage: string;
  heroAlt: string;
  headline: string;
  subhead: string;
  heroCta: { label: string; href: string };
  stats: { value: string; label: string }[];
  tags: string[];
  storyTitle: string;
  storyAccent: string;
  storyBody: string;
  liveCta?: { label: string; href: string };
  problems: string[];
  solutions: string[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    image: string;
  };
  gallery: { src: string; alt: string; size: 'wide' | 'portrait' }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'inat-bosanski',
    title: 'Inat Bosanski',
    kicker: 'Case study',
    heroImage: '/images/work/inat-lifestyle.png',
    heroAlt: 'Inat Bosanski apparel and campaign setup',
    headline: 'Inat Bosanski — streetwear built like a campaign, not a template.',
    subhead: 'Brand, e-commerce and content for a Bosnian diaspora streetwear label.',
    heroCta: { label: 'See the work', href: '#gallery' },
    stats: [
      { value: 'Brand', label: 'Identity' },
      { value: 'Shop', label: 'E-commerce' },
      { value: 'Drop', label: 'Apparel' },
      { value: 'Look', label: 'Campaign' },
      { value: 'Social', label: 'Content' },
    ],
    tags: ['Apparel', 'E-commerce', 'Branding', 'Social', 'Campaign'],
    storyTitle: 'A full brand system for a diaspora streetwear label.',
    storyAccent: 'full brand system',
    storyBody:
      'Inat Bosanski needed more than a shop with products on a white background. The brand sits in football culture, diaspora pride and everyday attitude, so the site, the product photography and the social content had to feel like one campaign. I worked across branding, the e-commerce storefront, apparel presentation and social — so the hoodie on the site looked like the same brand people were seeing in content.',
    liveCta: { label: 'Back to selected work', href: '/#work' },
    problems: [
      'The brand needed a sharper identity than a generic merch shop.',
      'Product, website and social were at risk of looking like three different projects.',
      'The audience lives across countries and languages, not in one local market.',
      'Apparel had to feel premium on-screen, not like a quick print-on-demand drop.',
    ],
    solutions: [
      'Built the brand around campaign thinking instead of a template store.',
      'Kept website, product photography and social in the same visual system.',
      'Designed the storefront for browsing, story and purchase in one flow.',
      'Used lookbook-style photography so the clothes carried the attitude of the name.',
    ],
    testimonial: {
      quote:
        'It finally looked like a real label. The shop, the photos and the content felt like the same brand instead of three disconnected pieces.',
      name: 'Emin Begić',
      role: 'Founder at Inat Bosanski',
      image: '/images/testimonials/emin.png',
    },
    gallery: [
      {
        src: '/images/work/inat-mockup.png',
        alt: 'Inat Bosanski website and apparel mockup',
        size: 'wide',
      },
      {
        src: '/images/work/inat-portrait.png',
        alt: 'Inat Bosanski polo shirt campaign portrait',
        size: 'portrait',
      },
      {
        src: '/images/work/inat-website.png',
        alt: 'Inat Bosanski e-commerce homepage',
        size: 'wide',
      },
      {
        src: '/images/work/inat-shop.png',
        alt: 'Inat Bosanski product listings',
        size: 'wide',
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
