import { SEO_CONFIG } from "@/config/seo-config";
import { services } from "@/data/services";
import ServiceDetailContent from "./service-detail-content";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.title,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = services.find((s) => s.title === slug);

  if (!service) return {};

  const serviceTitles: Record<string, Record<string, string>> = {
    brakes_service: {
      pl: "Serwis Hamulców BMW | Mern Serwis",
      en: "BMW Brake Service | Mern Service",
      ua: "Сервіс гальмівної системи BMW | Mern Сервіс",
    },
    computer_diagnostics: {
      pl: "Diagnostyka Komputerowa BMW | Mern Serwis",
      en: "BMW Computer Diagnostics | Mern Service",
      ua: "Комп'ютерна діагностика BMW | Mern Сервіс",
    },
    mechanical_electrical_service: {
      pl: "Serwis Mechaniczny i Elektryczny BMW | Mern Serwis",
      en: "BMW Mechanical and Electrical Service | Mern Service",
      ua: "Механічний та електричний сервіс BMW | Mern Сервіс",
    },
    inspections: {
      pl: "Przeglądy Samochodowe BMW | Mern Serwis",
      en: "BMW Vehicle Inspections | Mern Service",
      ua: "Технічний огляд автомобілів BMW | Mern Сервіс",
    },
    engine_service: {
      pl: "Serwis Silników BMW | Mern Serwis",
      en: "BMW Engine Service | Mern Service",
      ua: "Сервіс двигунів BMW | Mern Сервіс",
    },
    coding: {
      pl: "Kodowanie i Programowanie BMW | Mern Serwis",
      en: "BMW Coding and Programming | Mern Service",
      ua: "Кодування та програмування BMW | Mern Сервіс",
    },
    painting: {
      pl: "Lakierowanie i Blacharstwo BMW | Mern Serwis",
      en: "BMW Painting and Bodywork | Mern Service",
      ua: "Лакування та кузовні роботи BMW | Mern Сервіс",
    },
    conditioning: {
      pl: "Serwis Klimatyzacji BMW | Mern Serwis",
      en: "BMW Air Conditioning Service | Mern Service",
      ua: "Сервіс кондиціонерів BMW | Mern Сервіс",
    },
    accessoires: {
      pl: "Montaż Akcesoriów BMW | Mern Serwis",
      en: "BMW Accessories Installation | Mern Service",
      ua: "Встановлення аксесуарів BMW | Mern Сервіс",
    },
    pricing: {
      pl: "Indywidualna Wycena Usług | Mern Serwis",
      en: "Individual Service Pricing | Mern Service",
      ua: "Індивідуальна оцінка послуг | Mern Сервіс",
    },
  };

  const serviceDescriptions: Record<string, Record<string, string>> = {
    brakes_service: {
      pl: "Profesjonalny serwis hamulców BMW, Rolls-Royce i MINI w Mern Serwis. Diagnostyka, naprawa i wymiana elementów układu hamulcowego.",
      en: "Professional BMW, Rolls-Royce, and MINI brake service at Mern Service. Diagnostics, repair, and replacement of brake system components.",
      ua: "Професійний сервіс гальмівної системи BMW, Rolls-Royce та MINI в Mern Сервіс. Діагностика, ремонт та заміна компонентів гальмівної системи.",
    },
    computer_diagnostics: {
      pl: "Kompleksowa diagnostyka komputerowa BMW, Rolls-Royce i MINI. Wykrywanie usterek, odczyt błędów i resetowanie systemów.",
      en: "Comprehensive computer diagnostics for BMW, Rolls-Royce, and MINI. Fault detection, error reading, and system resets.",
      ua: "Комплексна комп'ютерна діагностика BMW, Rolls-Royce та MINI. Виявлення несправностей, зчитування помилок та скидання систем.",
    },
    mechanical_electrical_service: {
      pl: "Profesjonalny serwis mechaniczny i elektryczny BMW, Rolls-Royce i MINI. Naprawa podwozia, układu napędowego i instalacji elektrycznej.",
      en: "Professional mechanical and electrical service for BMW, Rolls-Royce, and MINI. Chassis, drivetrain, and electrical system repairs.",
      ua: "Професійний механічний та електричний сервіс BMW, Rolls-Royce та MINI. Ремонт шасі, трансмісії та електричної системи.",
    },
    inspections: {
      pl: "Regularne przeglądy techniczne BMW, Rolls-Royce i MINI. Kompleksowa kontrola stanu technicznego pojazdu.",
      en: "Regular technical inspections for BMW, Rolls-Royce, and MINI. Comprehensive vehicle condition checks.",
      ua: "Регулярні технічні огляди BMW, Rolls-Royce та MINI. Комплексна перевірка технічного стану транспортного засобу.",
    },
    engine_service: {
      pl: "Specjalistyczny serwis silników BMW, Rolls-Royce i MINI. Naprawa, regeneracja i konserwacja silników spalinowych i diesla.",
      en: "Specialized engine service for BMW, Rolls-Royce, and MINI. Repair, regeneration, and maintenance of petrol and diesel engines.",
      ua: "Спеціалізований сервіс двигунів BMW, Rolls-Royce та MINI. Ремонт, регенерація та обслуговування бензинових та дизельних двигунів.",
    },
    coding: {
      pl: "Profesjonalne kodowanie i programowanie BMW. Aktualizacja oprogramowania, kodowanie modułów i personalizacja funkcji.",
      en: "Professional BMW coding and programming. Software updates, module coding, and function personalization.",
      ua: "Професійне кодування та програмування BMW. Оновлення програмного забезпечення, кодування модулів та персоналізація функцій.",
    },
    painting: {
      pl: "Profesjonalne lakierowanie i blacharstwo BMW, Rolls-Royce i MINI. Naprawa powypadkowa, polerowanie i detailing.",
      en: "Professional painting and bodywork for BMW, Rolls-Royce, and MINI. Post-accident repair, polishing, and detailing.",
      ua: "Професійне лакування та кузовні роботи BMW, Rolls-Royce та MINI. Післяаварійний ремонт, полірування та детейлінг.",
    },
    conditioning: {
      pl: "Serwis klimatyzacji BMW, Rolls-Royce i MINI. Przegląd, odgrzybianie, napełnianie i naprawę układów klimatyzacji.",
      en: "Air conditioning service for BMW, Rolls-Royce, and MINI. Inspection, disinfection, refilling, and repair of AC systems.",
      ua: "Сервіс кондиціонерів BMW, Rolls-Royce та MINI. Огляд, дезінфекція, заправка та ремонт систем кондиціонування.",
    },
    accessoires: {
      pl: "Profesjonalny montaż akcesoriów BMW, Rolls-Royce i MINI. Instalacja dodatkowego wyposażenia i modernizacja pojazdów.",
      en: "Professional accessories installation for BMW, Rolls-Royce, and MINI. Installation of additional equipment and vehicle upgrades.",
      ua: "Професійне встановлення аксесуарів BMW, Rolls-Royce та MINI. Встановлення додаткового обладнання та модернізація транспортних засобів.",
    },
    pricing: {
      pl: "Indywidualna wycena usług serwisowych BMW, Rolls-Royce i MINI. Transparentne ceny i elastyczne podejście do klienta.",
      en: "Individual pricing for BMW, Rolls-Royce, and MINI service. Transparent prices and flexible customer approach.",
      ua: "Індивідуальна оцінка послуг обслуговування BMW, Rolls-Royce та MINI. Прозорі ціни та гнучкий підхід до клієнта.",
    },
  };

  const titles = serviceTitles[slug] || {
    pl: `Mern Serwis - ${slug}`,
    en: `Mern Service - ${slug}`,
    ua: `Mern Сервіс - ${slug}`,
  };

  const descriptions = serviceDescriptions[slug] || {
    pl: `Profesjonalny serwis ${slug} w Mern Serwis`,
    en: `Professional ${slug} service at Mern Service`,
    ua: `Професійний сервіс ${slug} в Mern Сервіс`,
  };

  const title = titles[locale] || titles.pl;
  const description = descriptions[locale] || descriptions.pl;
  const canonicalUrl = `${SEO_CONFIG.BASE_URL}/${locale}/services/${slug}`;
  const ogImageUrl = `${SEO_CONFIG.BASE_URL}${SEO_CONFIG.OG_IMAGE_PATH}`;

  return {
    title,
    description,
    metadataBase: new URL(SEO_CONFIG.BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SEO_CONFIG.BASE_URL}/en/services/${slug}`,
        pl: `${SEO_CONFIG.BASE_URL}/pl/services/${slug}`,
        uk: `${SEO_CONFIG.BASE_URL}/ua/services/${slug}`,
        "x-default": `${SEO_CONFIG.BASE_URL}/pl/services/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: "MERN Serwis",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "en" ? "en_US" : locale === "pl" ? "pl_PL" : "uk_UA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
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

export default ServiceDetailContent;
