import type { Metadata } from "next";
import ServicesPage from "@/components/services/services";
import { createPageMetadata } from "@/config/seo-config";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata("services", locale, "services");
}

const Services = () => {
  return <ServicesPage />;
};

export default Services;
