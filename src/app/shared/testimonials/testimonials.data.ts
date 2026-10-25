export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  source: string;
  date?: string;
  linkedIn?: string;
  relation?: string;
  quoteFr?: string;
  quoteEn?: string;
  quote?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'greg-tappero-chefclub',
    name: 'Greg Tappero',
    role: 'CTO',
    company: 'Chefclub',
    source: 'External recommendation',
    date: '30.01.2019',
    quoteFr:
      'Sebastien est assurément un développeur expérimenté et efficace. Lors de nos missions chez [Chefclub] il a montré une productivité et un professionnalisme du plus haut standard. De par sa bonne humeur et ses compétences [il] s\'intégrera assurément dans votre équipe pour y accomplir des merveilles',
    quoteEn:
      'Sebastien is certainly an experienced and effective developer. On our projects at Chefclub he showed productivity and professionalism of the highest standard. With his good humour and skills he will surely fit into your team and work wonders there.',
  },
  {
    id: 'florian-rueegg-houzy',
    name: 'Florian Rüegg',
    role: 'CEO and Co-Founder',
    company: 'Houzy',
    source: 'LinkedIn',
    quote:
      'Working with Sebastien Barbier is one of the best decision you can make',
  },
  {
    id: 'derek-smith',
    name: 'Derek Smith',
    role: 'Event & Public Speaking Coach, Host & Master of Ceremonies',
    company: '',
    source: 'LinkedIn',
    linkedIn: 'https://www.linkedin.com/in/dereksmithcanada/',
    date: '2020-11-06',
    relation: 'worked with Sébastien on the same team',
    quote:
      'Sébastien is a tremendously dedicated professional with a thirst for creative problem-solving, international experiences and proven results. He is a trusted thinker and an absolute pleasure to work with. Highly recommend!',
  },
];
