import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads a file to Firebase Storage
 * @param file - The file to upload
 * @param path - The path in storage where the file should be stored
 * @returns Promise with the download URL
 */
export async function uploadFileToStorage(
  file: File,
  path: string
): Promise<string> {
  try {
    // Create a storage reference
    const storageRef = ref(storage, path);

    // Upload the file
    const snapshot = await uploadBytesResumable(storageRef, file);
    console.log("File uploaded successfully");

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Extract the storage path from a Firebase Storage URL
 * @param url The Firebase Storage URL
 * @returns The storage path or null if not a valid Firebase Storage URL
 */
export const extractStoragePath = (url: string): string | null => {
  try {
    // Extract the path from the URL
    // Example URL: https://firebasestorage.googleapis.com/v0/b/mern-e9975.appspot.com/o/gallery%2F1749390558267-bg235g.png?alt=media&token=f3fce726-879a-4113-ac1c-060e43ae5a0e
    const match = url.match(
      /firebasestorage.googleapis.com\/v0\/b\/[^/]+\/o\/([^?]+)/i
    );
    if (!match || !match[1]) return null;

    // Decode the URL-encoded path
    return decodeURIComponent(match[1]);
  } catch (error) {
    console.error("Error extracting storage path:", error);
    return null;
  }
};

/**
 * Delete a file from Firebase Storage by path
 * @param path The path to the file in Firebase Storage
 * @returns A promise that resolves when the file is deleted
 */
export const deleteFileByPath = async (path: string): Promise<void> => {
  try {
    const fileRef = ref(storage, path);
    await deleteObject(fileRef);
    console.log(`File at path ${path} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting file at path ${path}:`, error);
    throw error;
  }
};

/**
 * Delete a file from Firebase Storage using its URL
 * @param url The Firebase Storage URL of the file
 * @returns A promise that resolves when the file is deleted, or null if the URL is not a valid Firebase Storage URL
 */
export const deleteFileByUrl = async (url: string): Promise<undefined | null> => {
  const path = extractStoragePath(url);
  if (!path) {
    console.warn(`Not a valid Firebase Storage URL: ${url}`);
    return null;
  }

  await deleteFileByPath(path);
  return undefined;
};

/**
 * Delete multiple files from Firebase Storage using their URLs
 * @param urls An array of Firebase Storage URLs
 * @returns A promise that resolves when all files are deleted
 */
export const deleteFilesFromStorage = async (urls: string[]): Promise<void> => {
  try {
    const deletePromises = urls.map((url) => {
      const path = extractStoragePath(url);
      if (path) {
        return deleteFileByPath(path);
      }
      return Promise.resolve(); // Skip invalid URLs
    });

    await Promise.all(deletePromises);
    console.log(`${urls.length} files deleted from Firebase Storage`);
  } catch (error) {
    console.error("Error deleting files from Firebase Storage:", error);
    throw error;
  }
};

/**
 * Generates a unique file path for storage
 * @param file - The file to upload
 * @param folder - The folder in storage (e.g., 'gallery', 'news')
 * @returns The unique file path
 */
export function generateFilePath(file: File, folder: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = file.name.split(".").pop() || "";

  return `${folder}/${timestamp}-${randomString}.${fileExtension}`;
}
