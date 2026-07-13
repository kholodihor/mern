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
}: DeleteItemWithImagesParams): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const itemRef = doc(getDb(), collection, id);
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) {
      return { success: false, message: "Item not found" };
    }

    const item = itemSnap.data();

    if (item?.images && item.images.length > 0) {
      const images = Array.isArray(item.images) ? item.images : [item.images];
      await deleteFilesFromStorage(images);
    }

    await deleteDoc(itemRef);
    return { success: true, message: successMessage };
  } catch (error) {
    console.error(errorMessage, error);
    return { success: false, message: errorMessage };
  }
};
