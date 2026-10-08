import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import About from "@/components/about/about";
import { createPageMetadata } from "@/config/seo-config";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata("about", locale, "about");
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }, { locale: "ua" }];
}

const AboutPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <About />;
};

export default AboutPage;
