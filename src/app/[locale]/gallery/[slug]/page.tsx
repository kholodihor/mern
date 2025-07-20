import { Metadata } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import { IGalleryItem, PageMetadata } from "@/types";
import CarPage from "@/components/pages/gallery/car-page";

// Server-side data fetching function
async function getCarData(slug: string) {
  if (!slug) return null;

  const ref = collection(db, "gallery");
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
    description: `MERN Serwis | ${baseUrl} Galeria `,
  },
  en: {
    title: "Gallery | MERN Service",
    description: `MERN Serwis | ${baseUrl} Gallery `,
  },
  ua: {
    title: "Галерея | Автосервіс MERN",
    description: `MERN Serwis | ${baseUrl} Галерея `,
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
  const title = carData
    ? `${carData.car} | ${localeMetadata.title}`
    : `${localeMetadata.title} | ${cleanSlug}`;

  const description =
    carData && carData.desc && carData.desc[locale as keyof typeof carData.desc]
      ? carData.desc[locale as keyof typeof carData.desc]
      : `${localeMetadata.description} | ${cleanSlug}`;

  return {
    title: title,
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
      images:
        carData && carData.images && carData.images.length > 0
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
      images:
        carData && carData.images && carData.images.length > 0
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

// Helper function to serialize Firebase data
function serializeData(data: any) {
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

  // Pre-fetch the data on the server for SEO
  const initialData = await getCarData(resolvedParams.slug);

  // Serialize the data before passing it to the client component
  const serializedData = initialData
    ? JSON.parse(JSON.stringify(serializeData(initialData)))
    : null;

  // Pass both the slug and serialized data to the client component
  return <CarPage slug={resolvedParams.slug} initialData={serializedData} />;
}

export default Car;
