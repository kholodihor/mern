import { Locale } from "@/i18n/routing";

export type TLink = {
  name: string;
  href: string;
};

export type TServiceCard = {
  title: string;
  text: string;
  image?: string;
  link: string;
  tags: string[];
};

export interface IApplication {
  name: string;
  email: string;
  phone: string;
  vin: string;
  message: string;
  status?: string;
}

export interface IApplicationResponse extends IApplication {
  id: string;
  created_at: string;
}

export interface IUser {
  email: string;
}

export interface PageProps {
  params: {
    locale: "ua" | "en" | "pl";
  };
}

export interface ContactInfo {
  serviceCenter: string;
  address: string;
  phone: string;
  email: string;
}

export type Description = {
  [key: string]: string;
};

export interface IGalleryItem {
  id: string;
  car: string;
  categories: string[];
  images: string[];
  slug: string;
  desc: Description;
  fullDesc: Description;
  youtubeUrl: string;
  created_at: { seconds: number; nanoseconds: number };
}

export interface IReviewItem {
  id: string;
  name: string;
  review: string;
  rating: number;
  created_at: string;
}

export type PageMetadata = {
  [key in Locale]: {
    title: string;
    description: string;
  };
};

export interface INewsArticle {
  id: string;
  title: {
    [key: string]: string;
  };
  short_text: {
    [key: string]: string;
  };
  full_text: {
    [key: string]: string;
  };
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  images: string[];
  youtubeUrl?: string;
}
