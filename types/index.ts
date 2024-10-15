export type TLink = {
  name: string;
  href: string;
};

export type TServiceCard = {
  title: string;
  text: string;
  image: any;
  link: string;
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
  createdAt: string;
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
  id:number,
  car: string;
  services: string[];
  contact: ContactInfo;
  hashtags: string[];
  images: string[];
  createdAt: string;
}
