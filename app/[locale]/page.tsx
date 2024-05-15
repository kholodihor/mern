"use client";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Services from "@/components/Services";
import Steps from "@/components/Steps";
import Location from "@/components/Location";
import ApplicationForm from "@/components/ApplicationForm";

export default function Home() {
  return (
    <>
      <Intro />
      <About />
      <Services />
      <Steps />
      <ApplicationForm />
      <Location />
    </>
  );
}
