import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";

const About = () => {
  const t = useTranslations("About");
  return (
    <section
      id="about-us"
      className="flex min-h-screen w-full flex-col pt-[18vh] md:pt-[25vh]"
      aria-labelledby="about-us-title"
    >
      <SectionTitle id="about-us-title" title={t("title")} />
      <div className="flex w-full flex-col items-center justify-center space-y-8 py-[2rem] md:flex-row md:space-x-8 md:space-y-0 lg:px-[6rem]">
        {/* Text Section */}
        <div className="flex w-full flex-col items-start justify-center p-4 md:w-1/2">
          <p className="w-full text-[18px] md:text-[20px] lg:text-lg">
            {t("content")}
          </p>
          <h5 className="mt-4 text-lg font-semibold md:text-xl">{t("call")}</h5>
        </div>

        {/* Image Section */}
        <div className="flex w-full justify-center md:w-1/2">
          <Image
            src={"/about/about.png"}
            alt="Car image"
            width={500}
            height={500}
            className="w-full max-w-[500px] object-cover md:max-w-[80%]"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
