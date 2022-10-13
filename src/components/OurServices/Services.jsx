import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import styles from './Services.module.scss';
import { cards } from '../../data/cards';

const Services = () => {
  return (
    <section id='services' className={styles.Services}>
      <h1 className={styles.title}>jak to zrobić</h1>
      <div className={styles.cardWrapper}>
        {cards.map((card, index) => (
          <ServiceCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default Services;
