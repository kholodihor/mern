import { Metadata } from "next";

import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";

import Article from "@/components/pages/news/article";

const metadata: PageMetadata = {
  pl: {
    title: "Aktualności | MERN Serwis",
    description: `MERN Serwis | ${baseUrl} Aktualności`,
  },
  en: {
    title: "News | MERN Car Service",
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
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
  };
}

const NewsArticlePage = ({ params }: { params: { id: string } }) => {
  return <Article id={params.id} />;
};

export default NewsArticlePage;
