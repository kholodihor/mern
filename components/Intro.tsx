'use client';
import React from 'react';
import IntroSlider from './IntroSlider';

const Intro = () => {
  return (
    <div className="relative top-0 left-0 w-full min-h-screen ">
      <IntroSlider />
      <div className="absolute w-full sm:w-2/3 text-center sm:text-left top-[30%] sm:left-[10%] z-10">
        <h1
          className="uppercase text-[13vh] sm:text-[20vh] font-bold bg-clip-text text-transparent drop-shadow-[5px_5px_0_#000] bg-gradient-to-r from-sky-500 to-indigo-500 "
          data-aos="zoom-in"
          data-aos-once="true"
        >
          MERN
        </h1>
        <p
          className="uppercase text-[1.7rem] sm:text-[2rem] sm:-mt-[3rem] sm:ml-[2rem] font-bold bg-gradient-to-r from-[#f64f59]  via-[#c471ed] to-[#12c2e9] bg-clip-text text-transparent drop-shadow-[2px_2px_0_#000]"
          data-aos="fade-up"
          data-aos-once="true"
        >
          Idealny serwis dla idealnych aut
        </p>
      </div>
    </div>
  );
};

export default Intro;
