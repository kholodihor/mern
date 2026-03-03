import type { Metadata } from "next";
import News from "@/components/news/news";
import { baseUrl } from "@/constants";
import type { Locale } from "@/i18n/routing";
import { fetchNewsArticles } from "@/lib/server-data-fetchers";
import type { PageMetadata } from "@/types";

const metadata: PageMetadata = {
  pl: {
    title: "Aktualności | MERN Serwis",
    description:
      "Najnowsze informacje i aktualności z naszego serwisu samochodowego. Sprawdź co nowego w MERN Serwis.",
  },
  en: {
    title: "News | MERN Service",
    description:
      "Latest information and news from our car service. Check what's new at MERN Service.",
  },
  ua: {
    title: "Новини | Автосервіс MERN",
    description:
      "Найновіша інформація та новини з нашого автосервісу. Перевірте, що нового в Автосервісі MERN.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const localeMetadata = metadata[locale] || metadata.pl;
  // Create a new URL object to avoid duplicate locale segments
  const canonicalUrlObj = new URL(baseUrl);
  canonicalUrlObj.pathname = `/${locale}/news`;
  const canonicalUrl = canonicalUrlObj.toString();

  return {
    title: localeMetadata.title,
    description: localeMetadata.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/news`,
        pl: `${baseUrl}/pl/news`,
        uk: `${baseUrl}/ua/news`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: localeMetadata.title,
      description: localeMetadata.description,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: localeMetadata.title,
        },
      ],
      locale: locale === "en" ? "en_US" : locale === "pl" ? "pl_PL" : "uk_UA",
      siteName: "MERN Serwis",
    },
    twitter: {
      card: "summary_large_image",
      title: localeMetadata.title,
      description: localeMetadata.description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }, { locale: "ua" }];
}

const Page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;

  // Server-side fetch for SEO: render crawlable links for Googlebot
  let newsItems: Awaited<ReturnType<typeof fetchNewsArticles>> = [];
  try {
    newsItems = await fetchNewsArticles();
  } catch (error) {
    console.error("Failed to fetch news items for SSR:", error);
  }

  return (
    <>
      <News />
      {/* Server-rendered crawlable links for SEO — hidden visually but discoverable by search engines */}
      <nav aria-label="News articles" className="sr-only">
        <ul>
          {newsItems.map((item) => (
            <li key={item.id}>
              <a href={`/${locale}/news/${item.slug}`}>
                {item.title?.[locale] || item.slug}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Page;
