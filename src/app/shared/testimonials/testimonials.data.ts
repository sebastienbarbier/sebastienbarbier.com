export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  source: string;
  date?: string;
  quoteFr?: string;
  quoteEn?: string;
  quote?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'greg-tappero-chefclub',
    name: 'Greg Tappero',
    role: '',
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
];
