'use client';

import { GoogleAnalytics } from '@next/third-parties/google'

export default function GoogleAnalyticsWrapper({
  GA_MEASUREMENT_ID,
}: {
  GA_MEASUREMENT_ID: string;
}) {
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
}