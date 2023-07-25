import carservices from './animations/car-services.json';
import engine from './animations/car-engine.json';
import laptop from './animations/laptop.json';
import fan from './animations/fan.json';

export const cards = [
  {
    title: 'Kompleksowa mechanika pojazdów',
    text: 'Naprawiamy silnik dobrze',
    image: engine,
    link: '#',
  },
  {
    title: 'Diagnostyka',
    text: 'Naprawiamy silnik dobrze',
    image: carservices,
    link: '#',
  },
  {
    title: 'Kodowanie, Programowanie, Retrofit',
    text: 'Naprawiamy silnik dobrze',
    image: laptop,
    link: 'https://hartige.pl',
  },
  {
    title: 'Serwis klimatyzacji',
    text: 'Naprawiamy silnik dobrze',
    image: fan,
    link: '#',
  },
];

 export const links = [
    {
      name: 'Strona główna',
      href: '/',
    },
    {
      name: 'O nas',
      href: '#about',
    },
    {
      name: 'Usługi',
      href: '#services',
    },
  
    {
      name: 'Kontakt',
      href: '#contacts',
    },
  ];

  export const steps = [
    {
      title: 'Umów się',
      text: 'Niezależnie, czy chcesz skontrolować stan swojego samochodu, czy potrzebujesz naprawy, skontakuj się z nami dzwoniąc pod numer +48 509 158 159 i wybierz dogodny dla siebie termin. ',
      image: '/services/service-card1.webp'
    },
    {
      title: 'Przyprowadź samochód ',
      text: 'Przyprowadź samochód do naszego warsztatu i o nic się nie martw - zadbamy o niego w najlepszy sposób. ',
      image: '/services/service-card2.webp'
    },
    {
      title: 'Diagnostyka i wycena',
      text: 'Zweryfikujemy co wymaga naprawy i skontaktujemy się z Tobą. W tym celu będziemy musieli przeprowadzić jazdę próbną, bądź podnieść samochód na podnośniku.',
      image: '/services/service-card3.webp'
    },
    {
      title: 'Naprawa',
      text: 'To do Ciebie należy decyzja o naprawie pojazdu i bez akceptacji kosztów sami nic nie wymienimy.',
      image: '/services/service-card4.webp'
    },
  ];
  