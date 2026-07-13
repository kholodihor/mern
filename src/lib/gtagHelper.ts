export const pageView = (GA_MEASUREMENT_ID: string, url: string) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
