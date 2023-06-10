import React from 'react';
import Image from 'next/image';
import Lottie from 'lottie-react';
import styles from './WhatWeDoCard.module.scss';

const WhatWeDoCard = ({ card }) => {
  return (
    <div className={styles.WhatWeDoCard}>
      <div className={styles.inner}>
        <a href={card.link} target="_blank" rel="noreferrer">
          <Lottie animationData={card.image} className={styles.icon} />
        </a>
      </div>
      <div className={styles.inner}>
        <a href={card.link} target="_blank" rel="noreferrer">
          <h1>{card.title}</h1>
        </a>
      </div>
    </div>
  );
};

export default WhatWeDoCard;
