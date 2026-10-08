const MAX_DIMENSION = 2560;
const QUALITY = 0.85;
// Formats that should be uploaded untouched (animation / vector)
const SKIP_TYPES = ["image/gif", "image/svg+xml"];

const canvasToBlob = (canvas: HTMLCanvasElement, type: string) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, QUALITY));

/**
 * Downscales an image to MAX_DIMENSION on the longest side and re-encodes it
 * as WebP (JPEG where the browser can't encode WebP) before upload.
 * Returns the original file if compression isn't possible or doesn't help.
 */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || SKIP_TYPES.includes(file.type)) {
    return file;
  }

  try {
    // "from-image" applies EXIF orientation from phone photos
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
    const scale = Math.min(
      1,
      MAX_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    let blob = await canvasToBlob(canvas, "image/webp");
    // Older Safari silently falls back to PNG for unsupported types
    if (!blob || blob.type !== "image/webp") {
      blob = await canvasToBlob(canvas, "image/jpeg");
    }
    if (!blob || blob.size >= file.size) return file;

    const extension = blob.type === "image/webp" ? "webp" : "jpg";
    const name = file.name.replace(/\.[^.]+$/, "") || "image";
    return new File([blob], `${name}.${extension}`, { type: blob.type });
  } catch (error) {
    console.warn("Image compression failed, uploading original:", error);
    return file;
  }
}
