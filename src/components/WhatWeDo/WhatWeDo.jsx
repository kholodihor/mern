import React from 'react';
import WhatWeDoCard from '../WhatWeDoCard/WhatWeDoCard';
import styles from './WhatWeDo.module.scss';
import { cards } from '../../data/wwdcards';

const WhatWeDo = () => {
  return (
    <section className={styles.WhatWeDo}>
      <h1 className={styles.title} data-aos="fade-up" data-aos-once="true">
        co my robimy
      </h1>
      <div className={styles.wrapper} data-aos="fade-up" data-aos-once="true">
        {cards.map((card, index) => (
          <WhatWeDoCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default WhatWeDo;
