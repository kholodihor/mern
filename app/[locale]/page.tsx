'use client'
import Intro from '@/components/Intro';
import About from '@/components/About';
import Services from '@/components/Services';
import Steps from '@/components/Steps';
import Location from '@/components/Location';

export default function Home() {
  return (
    <>
      <Intro />
      <About />
      <Services />
      <Steps />
      <Location />
    </>
  );
}
