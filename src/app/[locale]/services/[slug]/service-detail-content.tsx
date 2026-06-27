"use client";

import { services } from "@/data/services";
import { useTranslations } from "next-intl";
import NextImage from "next/image";
import { notFound, useParams } from "next/navigation";

export default function ServiceDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations("Services");
  const tContact = useTranslations("Contacts");
  const tForm = useTranslations("Form");

  const service = services.find((s) => s.title === slug);

  if (!service) {
    notFound();
  }

  return (
    <section className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[17vh] lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold sm:text-5xl">
          {t(service.title)}
        </h1>

        <div className="mb-8 flex flex-col gap-8 md:flex-row md:items-start">
          <div className="relative h-64 w-full overflow-hidden rounded-xl sm:h-72 lg:h-80 bg-gray-700 md:w-1/3 md:h-80">
            <NextImage
              src={service.image}
              alt={t(service.title)}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              style={{ transform: "translate3d(0, 0, 0)" }}
            />
          </div>

          <div className="flex-1">
            <p className="text-lg text-gray-300 leading-relaxed">
              {t(`detail.${slug}`)}
            </p>
          </div>
        </div>

        <div className="mt-8  max-w-2xl rounded-lg bg-gray-800/20 p-6">
          <h2 className="mb-4 text-2xl font-bold">{tContact("title")}</h2>
          <p className="text-gray-300">{tForm("paragraph_1")}</p>
          <a
            href="/contacts"
            className="mt-4 inline-block rounded-lg bg-[linear-gradient(to_right,#3498db,#2c3e50)]  px-6 py-3 text-white transition-colors hover:bg-[linear-gradient(to_right,#3498db,#2c3e50)] "
          >
            {tContact("link")}
          </a>
        </div>
      </div>
    </section>
  );
}
