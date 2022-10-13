import React from 'react';
import IntroSlider from '../IntroSlider/IntroSlider';
import styles from './Intro.module.scss';

const Intro = () => {
  return (
    <div className={styles.Intro}>
      <IntroSlider />
      <div className={styles.title}>
        <h1 data-aos="zoom-in" data-aos-once="true">MERN </h1>
        <p data-aos="fade-in" data-aos-once="true">Idealny serwis dla idealnych aut</p>
      </div>
    </div>
  );
};

export default Intro;
