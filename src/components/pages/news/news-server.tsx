import { useTranslations } from "next-intl";
import { INewsArticle } from "@/types";
import SectionTitle from "@/components/shared/section-title";
import NewsClientWrapper from "@/components/pages/news/news-client-wrapper";

interface NewsServerProps {
  initialData: INewsArticle[];
}

export default function NewsServer({ initialData }: NewsServerProps) {
  const t = useTranslations("News");

  return (
    <section
      id="news"
      className="mt-[15vh] min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:mt-[17vh] lg:px-8 lg:py-20"
      aria-labelledby="news-title"
    >
      <div className="mx-auto max-w-[90vw]">
        <SectionTitle id="news-title" title={t("title")} />
        
        {/* This part will be hydrated with client-side interactivity */}
        <NewsClientWrapper initialData={initialData} />
      </div>
    </section>
  );
}
