import { getFirebaseApp } from "@/lib/firebase";
import { getDb } from "@/lib/firebase-db";
import axios from "axios";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs";
import { mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

// Function to check if a URL is from Uploadcare
const isUploadcareUrl = (url: string): boolean => {
  return url.includes("ucarecdn.com");
};

// Function to download an image from a URL
const downloadImage = async (url: string, filePath: string): Promise<void> => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "arraybuffer",
    });

    if (response.status !== 200) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    await writeFileAsync(filePath, response.data);
    console.log(`Downloaded image to ${filePath}`);
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error);
    throw error;
  }
};

// Function to upload an image to Firebase Storage
const uploadToFirebaseStorage = async (
  filePath: string,
  storagePath: string,
): Promise<string> => {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const storageRef = ref(getStorage(getFirebaseApp()), storagePath);
    await uploadBytes(storageRef, fileBuffer);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`Uploaded to Firebase Storage: ${downloadURL}`);
    return downloadURL;
  } catch (error) {
    console.error(`Error uploading to Firebase Storage:`, error);
    throw error;
  }
};

// Function to process a single image
const processImage = async (
  imageUrl: string,
  index: number,
  collectionName: string,
  docId: string,
  tempDir: string,
): Promise<string> => {
  if (!isUploadcareUrl(imageUrl)) {
    console.log(`Image ${imageUrl} is not from Uploadcare, skipping...`);
    return imageUrl; // Return the original URL if it's not from Uploadcare
  }

  const fileName = `${Date.now()}-${index}-${Math.random().toString(36).substring(2, 8)}.jpg`;
  const tempFilePath = path.join(tempDir, fileName);
  const storagePath = `${collectionName}/${docId}/${fileName}`;

  try {
    // Download the image
    await downloadImage(imageUrl, tempFilePath);

    // Upload to Firebase Storage
    const newUrl = await uploadToFirebaseStorage(tempFilePath, storagePath);

    // Clean up temp file
    await unlinkAsync(tempFilePath);

    return newUrl;
  } catch (error) {
    console.error(`Error processing image ${imageUrl}:`, error);
    // If there's an error, return the original URL
    return imageUrl;
  }
};

// Function to process all images in a document while preserving order
const processDocumentImages = async (
  collectionName: string,
  docId: string,
  images: string[],
  tempDir: string,
): Promise<string[]> => {
  console.log(
    `Processing ${images.length} images for ${collectionName}/${docId}`,
  );

  // Process images sequentially to maintain order
  const newImages: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i];
    console.log(`Processing image ${i + 1}/${images.length}: ${imageUrl}`);

    const newUrl = await processImage(
      imageUrl,
      i,
      collectionName,
      docId,
      tempDir,
    );
    newImages.push(newUrl);

    console.log(`Processed image ${i + 1}/${images.length}`);
  }

  return newImages;
};

// Main migration function
const migrateImages = async (tempDir: string) => {
  try {
    // Process gallery collection
    console.log("Starting migration of gallery images...");
    const gallerySnapshot = await getDocs(collection(getDb(), "gallery"));

    let galleryCount = 0;
    for (const galleryDoc of gallerySnapshot.docs) {
      const galleryData = galleryDoc.data();

      if (galleryData.images && galleryData.images.length > 0) {
        console.log(`Processing gallery item: ${galleryDoc.id}`);

        // Process all images in this gallery item while preserving order
        const newImages = await processDocumentImages(
          "gallery",
          galleryDoc.id,
          galleryData.images,
          tempDir,
        );

        // Update the document with new image URLs
        await updateDoc(doc(getDb(), "gallery", galleryDoc.id), {
          images: newImages,
        });

        console.log(`Updated gallery item: ${galleryDoc.id}`);
        galleryCount++;
      }
    }

    // Process news collection
    console.log("Starting migration of news images...");
    const newsSnapshot = await getDocs(collection(getDb(), "news"));

    let newsCount = 0;
    for (const newsDoc of newsSnapshot.docs) {
      const newsData = newsDoc.data();

      if (newsData.images && newsData.images.length > 0) {
        console.log(`Processing news article: ${newsDoc.id}`);

        // Process all images in this news article while preserving order
        const newImages = await processDocumentImages(
          "news",
          newsDoc.id,
          newsData.images,
          tempDir,
        );

        // Update the document with new image URLs
        await updateDoc(doc(getDb(), "news", newsDoc.id), {
          images: newImages,
        });

        console.log(`Updated news article: ${newsDoc.id}`);
        newsCount++;
      }
    }

    return { success: true, galleryCount, newsCount };
  } catch (error) {
    console.error("Error during migration:", error);
    return { success: false, error: (error as Error).message };
  }
};

export async function GET() {
  // Create temp directory
  const tempDir = path.join(process.cwd(), "temp");

  try {
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }

    const result = await migrateImages(tempDir);

    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Migration failed:", error);

    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
