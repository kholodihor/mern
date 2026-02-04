import type { Metadata } from "next";
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

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
