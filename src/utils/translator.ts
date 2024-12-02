interface ITranslateTextResponse {
  data: {
    translations: Array<{
      translatedText: string;
    }>;
  };
}

export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Ensure your API key is stored securely
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const body = {
    q: text,
    target: targetLanguage, // Example: 'uk' for Ukrainian, 'en' for English
  };

  try {
    // Send request to Google Translate API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Parse the JSON response
    const data: ITranslateTextResponse = await response.json();

    // Check if the response has the expected structure and return the translated text
    if (data?.data?.translations?.length > 0) {
      return data.data.translations[0].translatedText; // Return the translated text
    } else {
      throw new Error("Translation failed: No translated text available.");
    }
  } catch (error) {
    console.error("Error during translation:", error);
    throw new Error("Translation failed.");
  }
};
