export const pageview = (url) => {
  window.gtag('config', process.env.GOOGLE_ANLYTICS_ID, {
    path_url: url,
  });
};
