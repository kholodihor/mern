import React from 'react';
import Image from 'next/image';
import styles from './WhatWeDoCard.module.scss';

const WhatWeDoCard = ({ card }) => {
  return (
    <div className={styles.WhatWeDoCard}>
      <div className={styles.inner}>
        <a href={card.link} target="_blank" rel="noreferrer">
          <Image
            src={card.image}
            alt={card.title}
            width="50px"
            height="50px"
            style={{ filter: 'invert(1)' }}
          />
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
