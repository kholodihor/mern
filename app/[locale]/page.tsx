import type { Metadata } from "next";
import { PageProps } from "@/types";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Services from "@/components/Services";
import Steps from "@/components/Steps";
import Location from "@/components/Location";
import ApplicationForm from "@/components/ApplicationForm";

const metadataMainPage = {
  ua: {
    title: "Автосервіс MERN",
    description:
      "MERN Service - найкращий сервіс для ремонту Ваших BMW, Rolls Royce, Mini Cooper",
  },
  en: {
    title: "MERN Car Service",
    description:
      "MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper",
  },
  pl: {
    title: "MERN Serwis Samochodowy",
    description:
      "MERN Serwis to najlepszy serwis dla naprawy twojego BMW ,Rolls Royce, Mini Cooper",
  },
};

export const generateMetadata = ({ params }: PageProps): Metadata => {
  return {
    title: metadataMainPage[params.locale].title,
    description: metadataMainPage[params.locale].description,
  };
};

export default function Home() {
  return (
    <>
      <Intro />
      {/* <About /> */}
      <Services />
      {/* <Steps /> */}
      {/* <ApplicationForm /> */}
      {/* <Location /> */}
    </>
  );
}
