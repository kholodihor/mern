export async function getImageUrlsFromGroup(groupUuid: string): Promise<string[]> {
  function extractUuid(url: string): string | null {
    const regex = /https:\/\/ucarecdn\.com\/([a-f0-9\-]+~[0-9]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;  // Return the UUID or null if not found
  }

  const uuid = extractUuid(groupUuid);

  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
  const secretKey = process.env.NEXT_PUBLIC_UPLOADCARE_SECRET_KEY;
  const groupApiUrl = `https://upload.uploadcare.com/group/info/?pub_key=${publicKey}&group_id=${uuid}`

  try {
    const response = await fetch(groupApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Uploadcare.Simple ${publicKey}:${secretKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json()
    return data.files
  } catch (error) {
    console.error('Error fetching group images:', error);
    return [];
  }
}
