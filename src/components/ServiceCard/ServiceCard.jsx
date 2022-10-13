/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './ServiceCard.module.scss';

const ServiceCard = ({ card }) => {
  return (
    <article className={styles.ServiceCard} data-aos="fade-up" data-aos-once="true">
      <div className={styles.textbox}>
        <h1>{card.title}</h1>
        <p>{card.text}</p>
      </div>
      <div className={styles.imagebox}>
        <img src={card.icon} alt={card.title} />
      </div>
    </article>
  );
};

export default ServiceCard;
