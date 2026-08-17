export type WorkSize = 'featured' | 'portrait' | 'showcase';
export type MockupType = 'none' | 'phone';

export interface WorkItem {
  image: string;
  alt: string;
  size: WorkSize;
  mockup: MockupType;
}

export interface WorkGroup {
  number: string;
  title: string;
  category: string;
  layout: 'pair' | 'showcase';
  href?: string;
  items: WorkItem[];
}

export interface SocialPreview {
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const workGroups: WorkGroup[] = [
  {
    number: '01',
    title: 'Inat Bosanski',
    category: 'Branding · E-commerce · Apparel',
    layout: 'pair',
    href: '/work/inat-bosanski',
    items: [
      {
        image: '/images/work/inat-mockup.png',
        alt: 'Inat Bosanski website and apparel mockup',
        size: 'featured',
        mockup: 'none',
      },
      {
        image: '/images/work/inat-portrait.png',
        alt: 'Inat Bosanski polo shirt campaign portrait',
        size: 'portrait',
        mockup: 'none',
      },
    ],
  },
  {
    number: '02',
    title: 'Global Billing Group',
    category: 'Website · Content · Social Media',
    layout: 'pair',
    items: [
      {
        image: '/images/work/gbg-laptop.png',
        alt: 'Global Billing Group website on a laptop',
        size: 'featured',
        mockup: 'none',
      },
      {
        image: '/images/work/gbg-website.png',
        alt: 'Global Billing Group website page',
        size: 'portrait',
        mockup: 'none',
      },
    ],
  },
];

export const socialPreviews: SocialPreview[] = [
  {
    title: 'GeoPoint',
    category: 'Managed Socials',
    image: '/images/work/geopoint-instagram.png',
    alt: 'GeoPoint Instagram profile',
  },
  {
    title: 'Global Billing Group',
    category: 'Managed Socials',
    image: '/images/work/gbg-instagram.png',
    alt: 'Global Billing Group Instagram profile',
  },
  {
    title: 'Inat Bosanski',
    category: 'Managed Socials',
    image: '/images/work/inat-instagram.png',
    alt: 'Inat Bosanski Instagram profile',
  },
];
