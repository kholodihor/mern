import React from 'react';
import styles from './WhoWeAre.module.scss';

const WhoWeAre = () => {
  return (
    <section id="whoweare" className={styles.WhoWeAre}>
      <h1 className={styles.title} data-aos="zoom-in" data-aos-once="true">
        kim jesteśmy
      </h1>
      <p data-aos="zoom-in" data-aos-once="true">
        Firma Mern sp. Z o.o. powstała z zamiłowania do marki BMW. W chwili
        obecnej zajmujemy się głównie mechaniką i diagnostyką takich samochodów
        jak BMW, Mini i Rolls Royce. Nasze doświadczenie zarówno jak i
        doświadczenie naszych pracowników pozwala nam świadczyć usługi na
        najwyższym poziomie. Dysponujemy profesjonalnym sprzętem co pozwala nam
        zrobić swoją pracę sprawnie i precyzyjnie. Do naprawy pojazdów używamy
        oryginalnych części oraz części zamiennych wysokiej jakości. Do każdego
        klienta podchodzimy indywidualnie. <br /> Zapraszamy do kontaktu!
      </p>
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
