// ============================================================================
// SEO Configuration Constants
// ============================================================================

export const SEO_CONFIG = {
  BASE_URL: "https://mernserwis.com",
  CONTACT_INFO: "+48 509 158 159 | Przyszłość 2A, 05-126 Stanisławów Pierwszy",
  OG_IMAGE_PATH: "/opengraph-image.png",
  DEFAULT_LOCALE: "pl",
} as const;

export const TITLES: Record<string, string> = {
  ua: "Mern Сервіс - Незалежний сервіс BMW | Механік BMW у Варшаві",
  en: "Mern Service - Independent BMW Service | BMW Mechanic in Warsaw",
  pl: "Mern Serwis - Niezależny serwis BMW | Mechanik BMW w Warszawie",
};

export const DESCRIPTIONS: Record<string, string> = {
  pl: "MERN Serwis to najlepszy serwis dla naprawy twojego BMW, Rolls Royce, Mini Cooper",
  en: "MERN Serwis is the best service for repairing your BMW, Rolls Royce, Mini Cooper",
  ua: "Автосервіс MERN це найкращий сервіс для ремонту ваших BMW, Rolls Royce, Mini Cooper",
};

export const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  pl: "pl_PL",
  ua: "uk_UA",
};

export const KEYWORDS = [
  "MERN",
  "BMW",
  "Serwis Samochodowy",
  "Автосервіс",
  "Варшава",
  "Rolls Royce",
  "Mini Cooper",
  "Warszawa",
];

export const ROBOTS_CONFIG = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
};

export const PRECONNECT_URLS = [
  { href: "https://fonts.googleapis.com" },
  { href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
];

// ============================================================================
// Sitemap Configuration
// ============================================================================

export const SITEMAP_CONFIG = {
  REVALIDATE_TIME: 86400, // 24 hours in seconds
  CACHE_CONTROL: "public, s-maxage=86400, stale-while-revalidate=3600",
  LOCALES: ["pl", "en", "ua"] as const,
  STATIC_ROUTES: [
    {
      path: "",
      priority: 1.0,
      changeFreq: "daily" as const,
    },
    {
      path: "about",
      priority: 0.8,
      changeFreq: "weekly" as const,
    },
    {
      path: "services",
      priority: 0.8,
      changeFreq: "weekly" as const,
    },
    {
      path: "contacts",
      priority: 0.7,
      changeFreq: "monthly" as const,
    },
    {
      path: "news",
      priority: 0.9,
      changeFreq: "daily" as const,
    },
    {
      path: "gallery",
      priority: 0.8,
      changeFreq: "weekly" as const,
    },
  ],
} as const;

// ============================================================================
// Page Metadata Configuration
// ============================================================================

export const PAGE_METADATA = {
  about: {
    pl: {
      title: "O Nas | MERN Serwis",
      description: "MERN Serwis | Informacja o nas",
    },
    en: {
      title: "About Us | MERN Service",
      description: "MERN Serwis | Information about us",
    },
    ua: {
      title: "Про нас | Автосервіс MERN",
      description: "MERN Serwis | Інформація про нас",
    },
  },
  services: {
    pl: {
      title: "Usługi | MERN Serwis",
      description:
        "Profesjonalne usługi serwisowe dla pojazdów. Naprawa, konserwacja i diagnostyka samochodowa.",
    },
    en: {
      title: "Services | MERN Service",
      description:
        "Professional vehicle service and maintenance. Car repair, maintenance and diagnostics.",
    },
    ua: {
      title: "Послуги | Автосервіс MERN",
      description:
        "Професійне обслуговування транспортних засобів. Ремонт, технічне обслуговування та діагностика автомобілів.",
    },
  },
  contacts: {
    pl: {
      title: "Kontakty | MERN Serwis",
      description: "Nasze Kontakty",
    },
    en: {
      title: "Contacts | MERN Service",
      description: "Our Contacts",
    },
    ua: {
      title: "Контакти | Автосервіс MERN",
      description: "Наші контакти",
    },
  },
  news: {
    pl: {
      title: "Aktualności | MERN Serwis",
      description: "Najnowsze wiadomości z naszego serwisu",
    },
    en: {
      title: "News | MERN Service",
      description: "Latest news from our service",
    },
    ua: {
      title: "Новини | Автосервіс MERN",
      description: "Останні новини з нашого сервісу",
    },
  },
  gallery: {
    pl: {
      title: "Galeria | MERN Serwis",
      description: "Zdjęcia z naszych prac i realizacji",
    },
    en: {
      title: "Gallery | MERN Service",
      description: "Photos of our work and projects",
    },
    ua: {
      title: "Галерея | Автосервіс MERN",
      description: "Фотографії наших робіт та проєктів",
    },
  },
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

const getLocalizedValue = <T>(
  map: Record<string, T>,
  locale: string,
  fallback: string = SEO_CONFIG.DEFAULT_LOCALE
): T => map[locale] || map[fallback];

// ============================================================================
// Metadata Helper Functions
// ============================================================================

export const createPageMetadata = (
  pageKey: keyof typeof PAGE_METADATA,
  locale: string,
  path?: string
) => {
  const pageConfig = PAGE_METADATA[pageKey];
  const localeData =
    pageConfig[locale as keyof typeof pageConfig] || pageConfig.pl;
  const canonicalUrl = path
    ? `${SEO_CONFIG.BASE_URL}/${locale}/${path}`
    : `${SEO_CONFIG.BASE_URL}/${locale}`;

  return {
    title: localeData.title,
    description: `${SEO_CONFIG.CONTACT_INFO} | ${localeData.description}`,
    metadataBase: new URL(SEO_CONFIG.BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SEO_CONFIG.BASE_URL}/en${path ? `/${path}` : ""}`,
        pl: `${SEO_CONFIG.BASE_URL}/pl${path ? `/${path}` : ""}`,
        uk: `${SEO_CONFIG.BASE_URL}/ua${path ? `/${path}` : ""}`,
      },
    },
    openGraph: {
      type: "website" as const,
      url: canonicalUrl,
      title: localeData.title,
      description: localeData.description,
      siteName: TITLES[SEO_CONFIG.DEFAULT_LOCALE],
      images: [
        {
          url: `${SEO_CONFIG.BASE_URL}${SEO_CONFIG.OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          alt: localeData.title,
        },
      ],
      locale: getLocalizedValue(OG_LOCALES, locale),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: localeData.title,
      description: localeData.description,
      images: [`${SEO_CONFIG.BASE_URL}${SEO_CONFIG.OG_IMAGE_PATH}`],
    },
    robots: ROBOTS_CONFIG,
    keywords: KEYWORDS,
  };
};
