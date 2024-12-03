"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "@/helpers/storageHelper";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);

    //For Testing
    console.log("Cookie Consent: ", cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 mx-auto my-10 max-w-max flex-col items-center justify-between gap-4 rounded-lg bg-gray-700 px-3 py-3 shadow sm:flex-row md:max-w-screen-sm md:px-4 ${
        cookieConsent != null ? "hidden" : "flex"
      } `}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p>
            Używamy{" "}
            <span className="font-bold text-sky-400">plików cookie</span> na
            naszej stronie.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCookieConsent(false)}
          className="rounded-md border-gray-900 px-5 py-2 text-gray-300"
        >
          Odrzuć
        </button>
        <button
          onClick={() => setCookieConsent(true)}
          className="rounded-lg bg-gray-900 px-5 py-2 text-white"
        >
          Zezwalaj
        </button>
      </div>
    </div>
  );
}
