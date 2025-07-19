"use client";

import dynamic from "next/dynamic";

// Import with ssr: false in a client component
const CookieBanner = dynamic(() => import("../shared/cookie-banner"), {
  ssr: false,
});

export default function CookieBannerClient() {
  return <CookieBanner />;
}
