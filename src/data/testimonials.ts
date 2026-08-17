export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Bakir understood the brand faster than most people who had been in the room for months. The content actually looked like us, not like a template.',
    name: 'Amina Kovačević',
    role: 'Brand Lead',
    image: '/images/testimonials/amina.png',
  },
  {
    quote:
      'He ran the full loop — strategy, content, social and the website. I didn’t have to coordinate five different people to get one campaign out.',
    name: 'Luka Petrović',
    role: 'Founder',
    image: '/images/testimonials/luka.png',
  },
  {
    quote:
      'Clear, fast and honest. If something wasn’t working, he said so and fixed it. That’s rare, and it made the whole process easier.',
    name: 'Sara Jovanović',
    role: 'Marketing Manager',
    image: '/images/testimonials/sara.png',
  },
];
