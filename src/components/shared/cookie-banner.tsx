'use client';

import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '@/helpers/storageHelper';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied';

    window.gtag('consent', 'update', {
      analytics_storage: newValue,
    });

    setLocalStorage('cookie_consent', cookieConsent);

    //For Testing
    console.log('Cookie Consent: ', cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                       px-3 md:px-4 py-3 z-50 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-gray-700 rounded-lg shadow  ${cookieConsent != null ? 'hidden' : 'flex'
        } `}
    >
      <div className="text-center">
        <Link href="/info/cookies">
          <p>
            Używamy{' '}
            <span className="font-bold text-sky-400">plików cookie</span> na
            naszej stronie.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setCookieConsent(false)}
          className="px-5 py-2 text-gray-300 rounded-md border-gray-900"
        >
          Odrzuć
        </button>
        <button
          onClick={() => setCookieConsent(true)}
          className="bg-gray-900 px-5 py-2 text-white rounded-lg"
        >
          Zezwalaj
        </button>
      </div>
    </div>
  );
}
