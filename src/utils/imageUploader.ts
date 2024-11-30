export async function getImageUrlsFromGroup(groupUuid: string): Promise<string[]> {
  function extractUuid(url: string): string | null {
    const regex = /https:\/\/ucarecdn\.com\/([a-f0-9\-]+~[0-9]+)\//;
    const match = url.match(regex);
    return match ? match[1] : null;  // Return the UUID or null if not found
  }

  const uuid = extractUuid(groupUuid);

  const publicKey = 'ff76dce7219a0b044f12';  // Replace with your actual public key
  const groupApiUrl = `https://upload.uploadcare.com/group/info/?pub_key=${publicKey}&group_id=${uuid}`




  try {
    const response = await fetch(groupApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Uploadcare.Simple ${publicKey}:your-secret-key`  // Replace with your actual secret key
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json()
    // console.log(data.files)
    // Assuming the API returns an array of files
    return data.files
  } catch (error) {
    console.error('Error fetching group images:', error);
    return [];
  }
}
