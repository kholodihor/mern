import Article from "@/components/pages/news/article";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import { Metadata } from "next";

const metadata: PageMetadata = {
  pl: {
    title: "Aktualności | MERN Serwis",
    description: `MERN Serwis | ${baseUrl} Aktualności`,
  },
  en: {
    title: "News | MERN Service",
    description: `MERN Serwis | ${baseUrl} News`,
  },
  ua: {
    title: "Новини | Автосервіс MERN",
    description: `MERN Serwis | ${baseUrl} Новини`,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;

  return {
    title: `${localeMetadata.title} | ${slug}`,
    description: `${localeMetadata.description} | ${slug}`,
    alternates: {
      canonical: `${baseUrl}/${locale}/news/${slug}`,
      languages: {
        "en-US": `${baseUrl}/en/news/${slug}`,
        "pl-PL": `${baseUrl}/pl/news/${slug}`,
        "uk-UK": `${baseUrl}/ua/news/${slug}`,
      },
    },
  };
}

const NewsArticlePage = ({ params }: { params: { slug: string } }) => {
  return <Article slug={params.slug} />;
};

export default NewsArticlePage;
