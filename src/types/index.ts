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
  tags: string[]
};

export type TStep = {
  title: string;
  text: string;
  image: string;
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

export interface INewsItem {
  id: number,
  car: string;
  services: string[];
  contact: ContactInfo;
  hashtags?: string[];
  categories: string[]
  images: string[];
  slug: string;
  desc: string;
  fullDesc: string;
  createdAt: string;
}

export interface IReviewItem {
  id: number,
  name: string;
  review: string;
  rating: number;
  createdAt: string;
}

export type PageMetadata = {
  [key in Locale]: {
    title: string;
    description: string;
  }
};
