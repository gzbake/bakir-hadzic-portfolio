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
  gallery: { src: string; alt: string; size: 'wide' | 'portrait'; fit?: 'cover' | 'contain' }[];
  categories: { id: string; label: string; heading: string; body: string }[];
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
    categories: [
      {
        id: 'apparel',
        label: 'Apparel',
        heading: 'A full brand system built to be worn.',
        body: 'From streetwear concepts and apparel graphics to product mockups and final pieces, I worked across the creative side of building a recognizable clothing identity for the Bosnian diaspora.',
      },
      {
        id: 'ecommerce',
        label: 'E-commerce',
        heading: 'From product to checkout.',
        body: 'I built and managed the e-commerce side of Inat Bosanski, including Shopify, product listings, Printful integration, product presentation, storefront content, sales monitoring and the overall customer journey.',
      },
      {
        id: 'branding',
        label: 'Branding',
        heading: 'Turning an idea into a recognizable identity.',
        body: 'I developed the visual direction, brand positioning and creative system around Inat Bosanski, combining Bosnian identity, diaspora culture and modern streetwear into one consistent brand.',
      },
      {
        id: 'social',
        label: 'Social',
        heading: 'Building the brand where the audience already is.',
        body: 'I handled social content, publishing, community communication and creative direction across the brand’s social channels, adapting the visual identity into content designed for Instagram, Facebook and TikTok.',
      },
      {
        id: 'campaign',
        label: 'Campaign',
        heading: 'Creative built around launches, products and attention.',
        body: 'I worked on campaign concepts, promotional creatives, product launches and paid social assets, connecting the brand’s visuals, messaging and products into campaigns designed to get attention and drive traffic.',
      },
    ],
    storyTitle: 'A full brand system for a diaspora streetwear label.',
    storyAccent: 'full brand system',
    storyBody:
      'Inat Bosanski needed more than a shop with products on a white background. The brand sits in football culture, diaspora pride and everyday attitude, so the site, the product photography and the social content had to feel like one campaign. I worked across branding, the e-commerce storefront, apparel presentation and social — so the hoodie on the site looked like the same brand people were seeing in content.',
    liveCta: { label: 'Back to selected work', href: '/#work' },
    problems: [
      'Needed a sharper identity than a generic merch shop.',
      'Website, product and social felt like three projects.',
      'Audience lives across countries and languages.',
      'Apparel had to look premium, not like a POD drop.',
    ],
    solutions: [
      'Built the brand as a campaign, not a template store.',
      'Kept site, photos and social in one visual system.',
      'Designed the store for story and purchase together.',
      'Used lookbook photography that matched the name.',
    ],
    testimonial: {
      quote:
        'It finally looked like a real label. The shop, the photos and the content felt like the same brand instead of three disconnected pieces. People could tell it was Inat from the first scroll, whether they landed on the store, the product shots or the socials. That consistency is what we were missing, and Bakir actually delivered it.',
      name: 'Emin Begić',
      role: 'Founder at Inat Bosanski',
      image: '/images/testimonials/emin.png',
    },
    gallery: [
      {
        src: '/images/work/inat-studio-showcase.png',
        alt: 'Inat Studio streetwear e-commerce website showcase',
        size: 'wide',
        fit: 'contain',
      },
      {
        src: '/images/work/inat-polo-showcase.png',
        alt: 'Inat Bosanski polo shirt shown from front, side and back',
        size: 'wide',
        fit: 'contain',
      },
      {
        src: '/images/work/inat-facebook.png',
        alt: 'Inat Bosanski Facebook page and social presence',
        size: 'wide',
        fit: 'cover',
      },
      {
        src: '/images/work/inat-laptop-mockup.png',
        alt: 'Inat Bosanski storefront on a laptop with apparel samples',
        size: 'wide',
        fit: 'cover',
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
