import React from 'react';
import WhatWeDoCard from '../WhatWeDoCard/WhatWeDoCard';
import styles from './WhatWeDo.module.scss';
import { cards } from '../../data/wwdcards';
import Image from 'next/image';
import Lottie from 'lottie-react';
// import car from '../../data/animations/car.json';

const WhatWeDo = () => {
  return (
    <section className={styles.WhatWeDo}>
      <h1 className={styles.title}>co my robimy</h1>
      <div className={styles.wrapper}>
        {cards.map((card, index) => (
          <WhatWeDoCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
