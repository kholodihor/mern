import { getDb } from "@/lib/firebase-db";
import { deleteFilesFromStorage } from "@/lib/firebase-storage";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

interface DeleteItemWithImagesParams {
  collection: string;
  id: string;
  successMessage: string;
  errorMessage: string;
}

export const deleteItemWithImages = async ({
  collection,
  id,
  successMessage,
  errorMessage,
}: DeleteItemWithImagesParams) => {
  try {
    // First get the item to access its images
    const itemRef = doc(getDb(), collection, id);
    const itemSnap = await getDoc(itemRef);
    const item = itemSnap.data();

    // Handle image deletion based on URL pattern
    if (item?.images && item.images.length > 0) {
      const images = Array.isArray(item.images) ? item.images : [item.images];
      // Delete all images from Firebase Storage
      await deleteFilesFromStorage(images);
    }

    // Then delete the document from Firebase
    await deleteDoc(itemRef);
    alert(successMessage);
    return true;
  } catch (error) {
    console.error(errorMessage, error);
    return false;
  }
};
