import { Metadata } from "next";
import { collection, getDocs, query, where } from "firebase/firestore";
import { baseUrl } from "@/constants";
import { Locale } from "@/i18n/routing";
import { db } from "@/lib/firebase";
import { INewsArticle, PageMetadata } from "@/types";
import Article from "@/components/pages/news/article";

// Server-side data fetching function
async function getArticleData(slug: string) {
  if (!slug) return null;

  const ref = collection(db, "news");
  const slugQuery = query(ref, where("slug", "==", slug));
  const snapshot = await getDocs(slugQuery);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data() as Omit<INewsArticle, "id">;
    return { ...data, id: snapshot.docs[0].id };
  }

  return null;
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
    description: `MERN Serwis | ${baseUrl} Новини`,
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

  // Fetch article data for enhanced metadata
  const articleData = await getArticleData(cleanSlug);

  const localeMetadata = metadata[locale] || metadata.pl;
  const canonicalUrl = `${baseUrl}/${locale}/news/${cleanSlug}`;

  // Create a more descriptive title and description using the article data
  const title =
    articleData &&
    articleData.title &&
    articleData.title[locale as keyof typeof articleData.title]
      ? `${articleData.title[locale as keyof typeof articleData.title]} | ${localeMetadata.title}`
      : `${localeMetadata.title} | ${cleanSlug}`;

  const description =
    articleData &&
    articleData.short_text &&
    articleData.short_text[locale as keyof typeof articleData.short_text]
      ? `${articleData.short_text[locale as keyof typeof articleData.short_text]}`
      : `${localeMetadata.description} | ${cleanSlug}`;

  return {
    title: title,
    description: description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/news/${cleanSlug}`,
        pl: `${baseUrl}/pl/news/${cleanSlug}`,
        uk: `${baseUrl}/ua/news/${cleanSlug}`,
      },
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: title,
      description: description,
      images:
        articleData && articleData.images && articleData.images.length > 0
          ? [
              {
                url: articleData.images[0],
                width: 1200,
                height: 630,
                alt:
                  articleData.title[locale as keyof typeof articleData.title] ||
                  "News article",
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
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Server component that pre-fetches data
async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  // Resolve the params Promise
  const resolvedParams = await params;

  // Clean up slug for canonical URL - ensure it doesn't end with a dash
  const cleanSlug = resolvedParams.slug.endsWith("-")
    ? resolvedParams.slug.slice(0, -1)
    : resolvedParams.slug;

  // Pre-fetch the data on the server for SEO
  const initialData = await getArticleData(cleanSlug);

  // Serialize the data before passing it to the client component
  const serializedData = initialData
    ? JSON.parse(JSON.stringify(serializeData(initialData)))
    : null;

  // Pass both the slug and serialized data to the client component
  return <Article slug={resolvedParams.slug} initialData={serializedData} />;
}

export default NewsArticlePage;
