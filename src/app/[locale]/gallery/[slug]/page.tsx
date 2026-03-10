import CarPage from "@/components/gallery/car-page";
import { JsonLd } from "@/components/shared/json-ld";
import { baseUrl } from "@/constants";
import type { Locale } from "@/i18n/routing";
import { getDb } from "@/lib/firebase-db";
import type { IGalleryItem, PageMetadata } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { Metadata } from "next";

// Server-side data fetching function
async function getCarData(slug: string) {
  if (!slug) return null;

  const ref = collection(getDb(), "gallery");
  const slugQuery = query(ref, where("slug", "==", slug));
  const snapshot = await getDocs(slugQuery);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data() as Omit<IGalleryItem, "id">;
    return { ...data, id: snapshot.docs[0].id };
  }

  return null;
}

const metadata: PageMetadata = {
  pl: {
    title: "Galeria | MERN Serwis",
    description:
      "Zdjęcia i szczegóły napraw samochodów wykonanych w warsztacie MERN Serwis",
  },
  en: {
    title: "Gallery | MERN Service",
    description:
      "Photos and details of car repairs performed at MERN Service workshop",
  },
  ua: {
    title: "Галерея | Автосервіс MERN",
    description:
      "Фотографії та деталі ремонтів автомобілів, виконаних в автосервісі MERN",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  // Clean up slug for canonical URL - ensure it doesn't end with a dash
  const cleanSlug = slug.endsWith("-") ? slug.slice(0, -1) : slug;

  // Fetch car data for enhanced metadata
  const carData = await getCarData(cleanSlug);

  const localeMetadata = metadata[locale] || metadata.pl;
  // Create a new URL object to avoid duplicate locale segments
  const canonicalUrlObj = new URL(baseUrl);
  canonicalUrlObj.pathname = `/${locale}/gallery/${cleanSlug}`;
  const canonicalUrl = canonicalUrlObj.toString();

  // Create a more descriptive title and description using the car data
  // Use absolute title to prevent layout template from appending the long site name
  const title = carData
    ? `${carData.car} | ${localeMetadata.title}`
    : `${localeMetadata.title} | ${cleanSlug}`;

  const description =
    carData?.desc?.[locale as keyof typeof carData.desc] ??
    `${localeMetadata.description} | ${cleanSlug}`;

  return {
    title: { absolute: title },
    description: description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/gallery/${cleanSlug}`,
        pl: `${baseUrl}/pl/gallery/${cleanSlug}`,
        uk: `${baseUrl}/ua/gallery/${cleanSlug}`,
      },
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: title,
      description: description,
      images: carData?.images?.length
        ? [
            {
              url: carData.images[0],
              width: 1200,
              height: 630,
              alt: carData.car,
            },
          ]
        : [
            {
              url: "/opengraph-image.png",
              width: 1200,
              height: 630,
              alt: "MERN Serwis",
            },
          ],
      locale: locale === "en" ? "en_US" : locale === "pl" ? "pl_PL" : "uk_UA",
      siteName: "MERN Serwis",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: carData?.images?.length
        ? [carData.images[0]]
        : ["/opengraph-image.png"],
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

// Generate static params for all gallery items across all locales
export async function generateStaticParams() {
  const locales = ["pl", "en", "ua"];
  const ref = collection(getDb(), "gallery");
  const snapshot = await getDocs(ref);

  const params: { locale: string; slug: string }[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.slug) return;
    const cleanSlug =
      typeof data.slug === "string" && data.slug.endsWith("-")
        ? data.slug.slice(0, -1)
        : data.slug;

    for (const locale of locales) {
      params.push({ locale, slug: cleanSlug });
    }
  });

  return params;
}

// Helper function to serialize Firebase data
function serializeData(data: IGalleryItem | null) {
  if (!data) return null;

  // Handle Firestore Timestamp objects
  if (data.created_at && typeof data.created_at === "object") {
    return {
      ...data,
      // Convert Firestore timestamp to a simple object
      created_at: {
        seconds: data.created_at.seconds,
        nanoseconds: data.created_at.nanoseconds,
      },
    };
  }

  return data;
}

// Server component that pre-fetches data
async function Car({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  // Resolve the params Promise
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  // Clean up slug
  const cleanSlug = slug.endsWith("-") ? slug.slice(0, -1) : slug;

  // Pre-fetch the data on the server for SEO
  const initialData = await getCarData(cleanSlug);

  // Serialize the data before passing it to the client component
  const serializedData = initialData
    ? JSON.parse(JSON.stringify(serializeData(initialData)))
    : null;

  // Build JSON-LD structured data for SEO
  const jsonLd = initialData
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: initialData.car,
        description:
          initialData.desc?.[locale as keyof typeof initialData.desc] ||
          initialData.car,
        image: initialData.images?.length ? initialData.images : undefined,
        url: `${baseUrl}/${locale}/gallery/${cleanSlug}`,
        datePublished: initialData.created_at?.seconds
          ? new Date(initialData.created_at.seconds * 1000).toISOString()
          : undefined,
        publisher: {
          "@type": "Organization",
          name: "MERN Serwis",
          url: baseUrl,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/${locale}/gallery/${cleanSlug}`,
        },
      }
    : null;

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <CarPage slug={cleanSlug} initialData={serializedData} />
    </>
  );
}

export default Car;
