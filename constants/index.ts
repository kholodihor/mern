import carservices from './animations/car-services.json';
import engine from './animations/car-engine.json';
import laptop from './animations/laptop.json';
import fan from './animations/fan.json';

export const cards = [
  {
    title: 'complex_mechanics',
    text: 'Naprawiamy silnik dobrze',
    image: engine,
    link: '#',
  },
  {
    title: 'diagnostics',
    text: 'Naprawiamy silnik dobrze',
    image: carservices,
    link: '#',
  },
  {
    title: 'coding',
    text: 'Naprawiamy silnik dobrze',
    image: laptop,
    link: 'https://hartige.pl',
  },
  {
    title: 'climate',
    text: 'Naprawiamy silnik dobrze',
    image: fan,
    link: '#',
  },
];

export const links = [
  {
    name: 'strona_glowna',
    href: '/',
  },
  {
    name: 'o_nas',
    href: '#about',
  },
  {
    name: 'uslugi',
    href: '#services',
  },

  {
    name: 'kontakt',
    href: '#contacts',
  },
];

export const steps = [
  {
    title: 'title1',
    text: 'content1',
    image: '/services/service-card1.webp',
  },
  {
    title: 'title2',
    text: 'content2',
    image: '/services/service-card2.webp',
  },
  {
    title: 'title3',
    text: 'content3',
    image: '/services/service-card3.webp',
  },
  {
    title: 'title4',
    text: 'content4',
    image: '/services/service-card4.webp',
  },
];
