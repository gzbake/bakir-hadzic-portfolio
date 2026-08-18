export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Working with Bakir was always straightforward. He’s creative, reliable and good at taking an idea and turning it into something useful without needing much hand-holding. At ZedNova, he worked across social media, content, ads, web and AI workflows, and was always quick to adapt when something new came up. I’d happily work with him again.',
    name: 'Zlatko Marjanovic',
    role: 'Vlasnik ZedNove',
    image: '/images/testimonials/zlatko.png',
    rating: 5.0,
  },
  {
    quote:
      'Bakir was especially strong at spotting content opportunities before they became obvious. He had a good eye for finding viral videos, posts and trends, then understanding what made them work and how to adapt that into content for our own pages.',
    name: 'Edrice Jr Gresseau',
    role: 'CEO of LunarDark',
    image: '/images/testimonials/edrice.png',
    rating: 5.0,
  },
  {
    quote:
      'Bakir is one of those people who understands both the creative side of marketing and what actually makes content perform. He’s fast, adaptable and always looking for smarter ways to get things done, especially when it comes to AI and automation.',
    name: 'Amar Bosankic',
    role: 'AI Marketing Expert',
    image: '/images/testimonials/amar.png',
    rating: 4.9,
  },
  {
    quote:
      'On the e-commerce side, the work was solid. He brought good ideas around content, social media and how to present products in a way that actually gets attention. Like anyone, there were times we had to adjust direction or refine an idea, but he took feedback well and usually came back with a stronger version. Overall, reliable, creative and easy to work with.',
    name: 'Jacob Dodson',
    role: 'E-commerce',
    image: '/images/testimonials/jacob.png',
    rating: 4.6,
  },
  {
    quote:
      'Social media for Global Billing Group was handled with a good mix of creativity and consistency. He understood how to adapt content to the audience, keep the brand active and make sure what we posted actually had a purpose. He was reliable, easy to communicate with and always brought new ideas to the table.',
    name: 'Almira Ahmetovic',
    role: 'CEO, Global Billing Group',
    image: '/images/testimonials/almira.png',
    rating: 5.0,
  },
  {
    quote:
      'Our social media was managed with a clear focus on both growth and bringing in new business. He consistently created and published content that helped GeoPoint reach new people and generate new clients organically, without relying on paid ads.',
    name: 'Ajdin Halilovic',
    role: 'CEO of GeoPoint',
    image: '/images/testimonials/ajdin.png',
    rating: 5.0,
  },
  {
    quote:
      'Social media for several of our clients was managed at the same time, usually around 6–7 accounts, and the workload was handled really well. He was organized, consistent and knew how to adjust the content and communication for different brands without everything feeling the same.',
    name: 'Eldar Saric',
    role: 'SMMA Owner',
    image: '/images/testimonials/eldar.png',
    rating: 4.9,
  },
];

export const testimonialsAverage = Number(
  (testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length).toFixed(1),
);

export function starKind(rating: number, index: number): 'full' | 'half' | 'empty' {
  const full = Math.floor(rating);
  if (index < full) return 'full';
  if (index === full && rating % 1 !== 0) return 'half';
  return 'empty';
}
