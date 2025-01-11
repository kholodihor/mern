import { Metadata } from "next";
import dynamic from "next/dynamic";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { PageMetadata } from "@/types";
import Spiral from "@/components/shared/spiral/Spiral";

const DynamicPage = dynamic(
  () => import("@/components/pages/news/news"),

  { ssr: false, loading: () => <Spiral /> }
);

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
    description: `MERN Serwis | ${baseUrl} Наші Новини`,
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

const Page = () => {
  return <DynamicPage />;
};

export default Page;
