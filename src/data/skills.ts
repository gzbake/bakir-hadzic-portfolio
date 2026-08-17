export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Social Media',
    items: [
      'Strategy',
      'Content calendars',
      'Community management',
      'Instagram',
      'TikTok',
      'LinkedIn',
      'Audience communication',
    ],
  },
  {
    title: 'Content & Creative',
    items: [
      'Copywriting',
      'Creative direction',
      'Graphic design',
      'Video',
      'Campaign visuals',
      'Branding',
    ],
  },
  {
    title: 'Growth',
    items: [
      'Meta Ads',
      'Google Ads',
      'SEO content',
      'Website copy',
      'Analytics',
      'Funnel thinking',
    ],
  },
  {
    title: 'E-commerce & Web',
    items: [
      'Shopify',
      'Store design',
      'Product presentation',
      'Landing pages',
      'Brand systems',
    ],
  },
  {
    title: 'AI & Automation',
    items: [
      'Cursor',
      'Claude',
      'OpenAI',
      'Grok',
      'Gemini',
      'GLM',
      'Kimi',
      'Composer',
    ],
  },
];
