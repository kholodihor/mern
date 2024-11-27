import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";
import Image from "next/image";

const About = () => {
  const t = useTranslations("About");
  return (
    <section
      id="about-us"
      className="flex flex-col w-full min-h-screen pt-[18vh] md:pt-[25vh]"
      aria-labelledby="about-us-title"
    >
      <SectionTitle id='about-us-title' title={t("title")} />
      <div className="flex flex-col md:flex-row justify-center items-center w-full py-[2rem] lg:px-[6rem] space-y-8 md:space-y-0 md:space-x-8">

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4">
          <p className="w-full text-sm md:text-base lg:text-lg">
            {t("content")}
          </p>
          <h5 className="text-lg md:text-xl mt-4 font-semibold">{t('call')}</h5>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={'/about/about.png'}
            alt="Car image"
            width={500}
            height={500}
            className="object-cover w-full max-w-[500px] md:max-w-[80%]"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
