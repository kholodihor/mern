export const getUploadcareUrls = (images: string[]) => {
  const urls = images.map(
    (image: any) =>
      `https://ucarecdn.com/${image.file_id}/${image.filename.replace(/\.\w+$/, ".webp")}`
  );
  return urls;
};
