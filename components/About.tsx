'use client';
import React from 'react';
import Lottie from 'lottie-react';
import carservice from '@/constants/animations/carservice.json';

const About = () => {

  return (
    <section
      id="about"
      className="p-8 w-full flex justify-center items-center flex-col text-center"
    >
      <h1 className="mainTitle">kim jesteśmy</h1>

      <div className="sm:flex justify-center items-center gap-4 ">
        <div className="w-full sm:w-3/5 flex justify-center items-center" data-aos="fade-right">
          <p className="text-center text-[1.1rem]">
            Firma Mern sp. Z o.o. powstała z zamiłowania do marki BMW. W chwili
            obecnej zajmujemy się głównie mechaniką i diagnostyką takich
            samochodów jak BMW, Mini i Rolls Royce. Nasze doświadczenie zarówno
            jak i doświadczenie naszych pracowników pozwala nam świadczyć usługi
            na najwyższym poziomie. Dysponujemy profesjonalnym sprzętem co
            pozwala nam zrobić swoją pracę sprawnie i precyzyjnie. Do naprawy
            pojazdów używamy oryginalnych części oraz części zamiennych wysokiej
            jakości. Do każdego klienta podchodzimy indywidualnie. <br />
            <br />
            <strong>Zapraszamy do kontaktu!</strong>
          </p>
        </div>
        <div className="w-full sm:w-2/5" data-aos="fade-left">
          <Lottie
            animationData={carservice}
            className='w-full invert'
          />
        </div>
      </div>
      <div
        className="w-screen h-12 flex justify-center items-center gap-4 mt-8"
        id="dots"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default About;
