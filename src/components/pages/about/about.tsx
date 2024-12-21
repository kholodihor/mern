import SectionTitle from "@/components/shared/section-title";
import { useTranslations } from "next-intl";
import Image from "next/image";

const About = () => {
  const t = useTranslations("About");
  return (
    <section
      id="about-us"
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-[15vh] md:mt-[20vh]"
      aria-labelledby="about-us-title"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle id="about-us-title" title={t("title")} />

        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
              {t("content")}
            </p>
            <h5 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">
              {t("call")}
            </h5>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src="/about/about.png"
                alt="Car image"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
