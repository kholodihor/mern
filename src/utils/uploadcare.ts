/**
 * Delete a single image from Uploadcare
 */
export const deleteUploadcareImage = async (imageUrl: string): Promise<void> => {
  const match = imageUrl.match(/ucarecdn\.com\/([^/]+)/);
  if (!match || !match[1]) return;

  const uuid = match[1];
  const response = await fetch('/api/uploadcare/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uuid })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to delete image from Uploadcare: ${JSON.stringify(errorData)}`);
  }
};

/**
 * Delete multiple images from Uploadcare
 */
export const deleteUploadcareImages = async (imageUrls: string[]): Promise<void> => {
  try {
    await Promise.all(imageUrls.map(deleteUploadcareImage));
  } catch (error) {
    console.error('Error deleting images from Uploadcare:', error);
    throw error;
  }
};
