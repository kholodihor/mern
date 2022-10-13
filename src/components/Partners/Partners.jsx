/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import styles from './Partners.module.scss';

const partners = [
  {
    title: 'Hartige.pl',
    image: '/partners/hartige.jpg',
  },
  {
    title: 'BMW',
    image: '/partners/bmw.png',
  },
  {
    title: 'Mini Cooper',
    image: '/partners/mini.png',
  },
];

const Partners = () => {
  return (
    <section
      className={styles.Partners}
      data-aos="fade-up"
      data-aos-once="true"
    >
      <h1 className={styles.title}> partnerzy</h1>
      <ul>
        {partners.map((item, index) => (
          <li key={index}>
            <Image
              src={item.image}
              alt={`${item.title} logo`}
              width={150}
              height={150}
              style={{ borderRadius: '100%' }}
            />
            <h2>{item.title}</h2>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Partners;
