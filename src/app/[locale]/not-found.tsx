import { Metadata } from "next";
import Page404 from "@/components/shared/page-404";

// Add metadata to ensure search engines handle the 404 page correctly
export const metadata: Metadata = {
  title: "Page Not Found | 404",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
};

// This component will automatically return a 404 status code
const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Page404 />
    </div>
  );
};

export default NotFound;
