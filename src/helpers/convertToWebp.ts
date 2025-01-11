export const convertToWebp = (urls: string[]) => {
  return urls
    .map((img) => (img ? `${img.replace(/\.\w+$/, ".webp")}` : ""))
    .filter(Boolean);
};
