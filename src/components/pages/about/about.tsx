import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "@/components/shared/section-title";

const About = () => {
  const t = useTranslations("About");
  return (
    <section
      id="about-us"
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[20vh] lg:px-8 lg:py-20"
      aria-labelledby="about-us-title"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle id="about-us-title" title={t("title")} />

        <div className="mt-8 flex flex-col gap-8 sm:mt-12 md:flex-row md:gap-12 lg:mt-16 lg:gap-16">
          <div className="w-full space-y-6 md:w-1/2">
            <p className="text-base leading-relaxed text-gray-200 sm:text-lg lg:text-xl">
              {t("content")}
            </p>
            <h5 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">
              {t("call")}
            </h5>
          </div>

          <div className="flex w-full items-center justify-center md:w-1/2">
            <div className="relative aspect-square w-full max-w-[500px]">
              <Image
                src="/about/about.png"
                alt="Car image"
                fill
                className="rounded-lg object-cover"
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
