export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  overview: string;
  role: string[];
  challenge: string;
  approach: { title: string; items: string[] }[];
  responsibilities: string[];
  tools: string[];
  url?: string;
  featured: boolean;
  size: 'large' | 'medium';
  images: ProjectImage[];
  caseStudySections?: {
    title: string;
    content?: string;
    items?: string[];
  }[];
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  highlights: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ToolCategory {
  label: string;
  tools: string[];
}

export interface VideoProject {
  title: string;
  category: string;
  availability: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  telegram: string;
  phone: string;
  location: string;
  cvPath: string;
}

export const site = {
  name: 'Bakir Hadžić',
  title: 'Social Media Marketing & Digital Content Specialist',
  tagline: 'Social Media · Content · Digital Growth',
  url: 'https://bakirhadzic.com',
  description:
    'Social media marketing and digital content specialist with experience across content strategy, design, video, paid advertising, e-commerce, SEO and AI-assisted production.',
  heroHeadline: 'I build content, brands and digital systems that get attention.',
  heroSubheadline:
    'Social Media Marketing & Digital Content Specialist with experience across content strategy, design, video, paid advertising, e-commerce, SEO and AI-assisted production.',
  heroEyebrow: 'SOCIAL MEDIA · CONTENT · DIGITAL GROWTH',
  capabilities: ['Social Media', 'Content', 'Creative', 'Paid Growth', 'E-commerce', 'AI'],
};

export const contact: ContactInfo = {
  email: 'bake2905@gmail.com',
  linkedin: 'https://linkedin.com/in/bakirhadzic',
  telegram: 'https://t.me/baccaratofm',
  phone: '+387 61 310 261',
  location: 'Živinice, Bosnia and Herzegovina',
  cvPath: '/cv/Bakir-Hadzic-CV.pdf',
};

export const credibility = [
  '5+ Years Digital Experience',
  'Social · Content · Ads · E-commerce',
  'Agency + In-house + Independent Work',
  'Remote-ready',
];

export const projects: Project[] = [
  {
    slug: 'inat-bosanski',
    title: 'Inat Bosanski',
    subtitle: 'Building a diaspora apparel brand from concept to checkout.',
    category: 'Brand · Social Media · E-commerce · Paid Social',
    description:
      'Inat Bosanski is a Bosnian identity and diaspora-focused apparel brand built as an end-to-end project — brand concept, apparel design, social content, and a working Shopify webshop.',
    overview:
      'Inat Bosanski is a Bosnian identity and diaspora-focused apparel brand built as an end-to-end project. Bakir worked across brand positioning, concept development, visual identity, social content, community engagement, apparel graphic design, product mockups, product listings, Shopify, Printful, Meta Ads, and sales monitoring — taking the brand from an idea to something people actually buy and wear.',
    role: ['Brand Strategy', 'Social Media', 'Design', 'E-commerce', 'Paid Social'],
    challenge:
      'Build a culturally recognizable apparel brand for Bosnian diaspora customers — one that feels authentic, looks premium, and works as a complete digital business from social presence through to checkout.',
    approach: [
      {
        title: 'Brand',
        items: ['Brand positioning & concept', 'Visual identity', 'Community engagement'],
      },
      {
        title: 'Content',
        items: ['Social content & posting', 'Campaign creatives', 'Lifestyle & product photography direction'],
      },
      {
        title: 'Product',
        items: ['Apparel graphic design', 'Product mockups', 'Product listings'],
      },
      {
        title: 'Commerce',
        items: ['Shopify & Printful setup', 'Product listings', 'Sales & order monitoring'],
      },
      {
        title: 'Growth',
        items: ['Meta Ads campaigns', 'Audience targeting', 'Performance monitoring'],
      },
    ],
    responsibilities: [
      'Brand positioning & concept development',
      'Visual identity & apparel graphic design',
      'Social content, posting & community engagement',
      'Product mockups, listings & Shopify setup',
      'Printful integration & order monitoring',
      'Meta Ads campaign planning & execution',
    ],
    tools: ['Shopify', 'Printful', 'Meta Ads', 'Canva', 'Photoshop', 'Illustrator'],
    url: 'https://inatbosanski.com',
    featured: true,
    size: 'large',
    images: [
      { src: '/images/projects/inat-bosanski/hero.svg', alt: 'Inat Bosanski homepage preview' },
      { src: '/images/projects/inat-bosanski/product.svg', alt: 'Inat Bosanski apparel design' },
      { src: '/images/projects/inat-bosanski/social.svg', alt: 'Inat Bosanski social content' },
    ],
  },
  {
    slug: 'global-billing',
    title: 'Global Billing Group',
    subtitle: 'Making complex healthcare services easier to communicate online.',
    category: 'Social Media · Content & SEO · B2B Website Support',
    description:
      'Global Billing Group operates in the medical billing industry. Work covered social media content, SEO-oriented blog articles, and website content structure for a healthcare-focused B2B audience.',
    overview:
      'Global Billing Group operates in the medical billing industry. Bakir contributed to the company\'s social media content and posting, SEO-oriented blog articles on medical billing and healthcare topics, and support on website content structure and service page copy for a healthcare-focused B2B audience.',
    role: ['Social Media', 'Content & SEO', 'Website Support'],
    challenge:
      'Communicate complex medical billing services clearly to healthcare business owners — maintaining professional B2B tone while making technical topics accessible through content and social channels.',
    approach: [
      {
        title: 'Social & Content',
        items: ['Social media management', 'Content planning', 'Brand consistency'],
      },
      {
        title: 'SEO & Copywriting',
        items: ['Blog articles', 'Medical billing topic research', 'Professional B2B tone'],
      },
      {
        title: 'Website Support',
        items: ['Content structure', 'Service page copy', 'Ongoing content upkeep'],
      },
    ],
    responsibilities: [
      'Social media management & content planning',
      'SEO-oriented blog articles on medical billing topics',
      'Medical billing topic research & healthcare content',
      'Website content structure & service page copy',
      'Brand consistency across channels',
      'Ongoing content upkeep',
    ],
    tools: ['WordPress', 'SEO Content', 'Copywriting', 'Canva', 'Social Scheduling'],
    url: 'https://gbginfo.com',
    featured: true,
    size: 'medium',
    images: [
      { src: '/images/projects/global-billing/hero.svg', alt: 'Global Billing Group website preview' },
      { src: '/images/projects/global-billing/services.svg', alt: 'Global Billing Group services page' },
    ],
    caseStudySections: [
      {
        title: 'Social Content',
        items: [
          'Managed social media content and posting schedule',
          'Maintained brand consistency across channels',
          'Planned content aligned with business communication goals',
        ],
      },
      {
        title: 'SEO & Copywriting',
        items: [
          'Wrote SEO-oriented blog articles on medical billing topics',
          'Researched healthcare business and billing subjects',
          'Maintained professional B2B tone throughout content',
        ],
      },
      {
        title: 'Website Support',
        items: [
          'Contributed to website content structure',
          'Wrote and refined service page copy',
          'Supported ongoing content upkeep after main engagement',
        ],
      },
    ],
  },
];

export const experience: Experience[] = [
  {
    company: 'ZedNova Studio',
    role: 'Digital Projects, Content & E-commerce Specialist',
    dates: '2025 — 2026',
    highlights: [
      'Worked across social media, content production, branding, e-commerce, and website support on client and internal projects',
      'Ran projects from early concept through content, design, launch, and day-to-day management',
      'Led Inat Bosanski — an apparel and e-commerce brand from concept through launch',
      'Produced AI-assisted video content including promotional, music video, and documentary-style pieces',
    ],
  },
  {
    company: 'GeoPoint',
    role: 'Social Media & Digital Marketing Specialist',
    dates: '2021 — 2024',
    highlights: [
      'Managed company social media — content planning, publishing, and audience communication',
      'Handled business email, client communication, and commercial offers',
      'Wrote SEO-focused articles and blog content for visibility and client acquisition',
      'Planned and managed Meta Ads and Google Ads campaigns; maintained company website',
    ],
  },
  {
    company: 'Imperia Marketing',
    role: 'SEO Content Specialist — Crypto & Casino',
    dates: '2024 · 6 months',
    highlights: [
      'Wrote exclusively for crypto and online casino/gaming websites',
      'Produced 5–6 SEO-optimized blog posts per day within automated content workflows',
      'Worked within a structured, high-volume production system',
    ],
  },
  {
    company: 'Global Billing Group',
    role: 'Social Media & Content Specialist',
    dates: 'Feb 2023 — Mar 2024',
    highlights: [
      'Managed social media content and posting alongside broader marketing needs',
      'Wrote SEO-oriented blog articles on medical billing and healthcare topics',
      'Contributed to website content structure and page copy',
    ],
  },
  {
    company: 'Nargila Bar Čaršija',
    role: 'Social Media Content Creator',
    dates: '2022',
    highlights: [
      'Created promotional content for events, special evenings, and venue announcements',
      'Designed social media graphics and edited promotional videos',
      'Published content across Instagram, Facebook, and TikTok',
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Social Media Marketing',
    items: [
      'Content planning',
      'Scheduling',
      'Community management',
      'Organic growth',
      'Platform strategy',
      'Instagram',
      'TikTok',
      'Facebook',
      'Audience research',
      'Paid social campaigns',
    ],
  },
  {
    title: 'Content, Design & Video',
    items: [
      'Graphic design',
      'Brand identity',
      'Social visuals',
      'Short-form video',
      'Long-form video',
      'Content writing',
      'Creative direction',
    ],
  },
  {
    title: 'Paid Advertising & Growth',
    items: [
      'Meta Ads',
      'Google Ads',
      'Campaign planning',
      'Campaign execution',
      'Performance monitoring',
      'SEO content',
      'Crypto content',
      'iGaming content',
    ],
  },
  {
    title: 'Web & E-commerce',
    items: [
      'WordPress',
      'Webflow',
      'Framer',
      'Shopify',
      'Printful',
      'Printify',
      'Landing pages',
      'Product listings',
      'Order monitoring',
      'Sales monitoring',
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      'ChatGPT',
      'Claude',
      'ComfyUI',
      'AI image workflows',
      'AI video workflows',
      'Prompt development',
      'Workflow automation',
    ],
  },
  {
    title: 'Creative Software',
    items: [
      'Figma',
      'Canva',
      'Photoshop',
      'Illustrator',
      'DaVinci Resolve',
      'CapCut',
    ],
  },
];

export const toolCategories: ToolCategory[] = [
  {
    label: 'CREATIVE',
    tools: ['Figma', 'Canva', 'Photoshop', 'Illustrator', 'DaVinci Resolve', 'CapCut'],
  },
  {
    label: 'MARKETING',
    tools: ['Meta Ads', 'Google Ads', 'SEO', 'Social Scheduling', 'Copywriting'],
  },
  {
    label: 'WEB',
    tools: ['WordPress', 'Webflow', 'Framer', 'Shopify'],
  },
  {
    label: 'AI',
    tools: ['ChatGPT', 'Claude', 'ComfyUI', 'AI Workflows'],
  },
  {
    label: 'E-COMMERCE',
    tools: ['Shopify', 'Printful', 'Printify'],
  },
  {
    label: 'PRODUCTION',
    tools: ['DaVinci Resolve', 'CapCut', 'Artlist', 'ComfyUI'],
  },
];

export const videoProduction = {
  title: 'Content Production & Video Editing',
  description:
    'Work spans social-first video editing and AI-assisted production, from short-form content for Reels and TikTok to longer experimental pieces.',
  categories: [
    {
      title: 'Video Editing',
      items: [
        'Hook & pacing development',
        'Captions & visual hierarchy',
        'Platform-specific formatting',
        'Reels, TikTok, Facebook video',
        'DaVinci Resolve · CapCut · Artlist',
      ],
    },
    {
      title: 'Social & Campaign Content',
      items: [
        'Promotional & event content',
        'Short-form social videos',
        'Selected long-form edits',
        'Thumbnails & social visuals',
      ],
    },
    {
      title: 'AI-Assisted Production',
      items: [
        'Realistic AI-generated video',
        'Prompt development & iteration',
        'ComfyUI workflows',
        'Quality control & editing',
      ],
    },
  ],
  projects: [
    { title: 'AI-Assisted Promotional Video', category: 'AI production · ComfyUI', availability: 'Available on request' },
    { title: 'AI-Assisted Music Video', category: 'Direction · AI workflow', availability: 'Available on request' },
    { title: 'Documentary-Style Project', category: 'Editing · AI-assisted visuals', availability: 'Available on request' },
    { title: 'Short-Form Social Edits', category: 'Hooks · pacing · captions · CapCut', availability: 'Available on request' },
    { title: 'Long-Form Editing', category: 'DaVinci Resolve', availability: 'Available on request' },
  ] as VideoProject[],
};

export const about = {
  headline: 'Marketing brain. Creative toolkit. Builder mentality.',
  copy: `I work across strategy and execution rather than staying in one narrow specialty. From research and idea development through content creation, design, publishing, campaign launch, and performance review — I can handle multiple stages of digital marketing without needing a separate person for each step.

My background spans agency work, in-house marketing, hospitality, healthcare content, and independent brand building. That mix taught me to adapt quickly, communicate clearly, and deliver work that actually ships.`,
  differentiators: [
    { label: 'Strategy', description: 'I understand what should be made.' },
    { label: 'Creative', description: 'I can actually make it.' },
    { label: 'Distribution', description: 'I understand how to get it in front of people.' },
    { label: 'Optimization', description: 'I can analyze what happens next.' },
  ],
  education: [
    { school: 'International Burch University, Sarajevo', detail: 'IT Department — part-time' },
    { school: 'JU Gimnazija Živinice', detail: 'Secondary Education' },
  ],
  certifications: ['Google Ads Certificate — 2022', 'Google Analytics Certificate — 2023'],
  languages: [
    { language: 'Bosnian', level: 'Native' },
    { language: 'English', level: 'Advanced written, reading and listening; intermediate spoken' },
  ],
};

export const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#capabilities' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
