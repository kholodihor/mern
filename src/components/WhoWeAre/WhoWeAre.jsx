import React from 'react';
import Lottie from 'lottie-react';
import carservice from '../../data/animations/carservice.json';
import styles from './WhoWeAre.module.scss';

const WhoWeAre = () => {
  return (
    <section id="whoweare" className={styles.WhoWeAre}>
      <h1 className={styles.title}>kim jesteśmy</h1>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p>
            Firma Mern sp. Z o.o. powstała z zamiłowania do marki BMW. W chwili
            obecnej zajmujemy się głównie mechaniką i diagnostyką takich
            samochodów jak BMW, Mini i Rolls Royce. Nasze doświadczenie zarówno
            jak i doświadczenie naszych pracowników pozwala nam świadczyć usługi
            na najwyższym poziomie. Dysponujemy profesjonalnym sprzętem co
            pozwala nam zrobić swoją pracę sprawnie i precyzyjnie. Do naprawy
            pojazdów używamy oryginalnych części oraz części zamiennych wysokiej
            jakości. Do każdego klienta podchodzimy indywidualnie. <br /><br />
            <strong>Zapraszamy do kontaktu!</strong>
          </p>
        </div>
        <div className={styles.animationBox}>
          <Lottie animationData={carservice} className={styles.animation} />
        </div>
      </div>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default WhoWeAre;
