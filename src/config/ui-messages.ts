// ============================================================================
// UI Messages Configuration
// ============================================================================

export const UI_MESSAGES = {
  confirmations: {
    deleteApplication: {
      pl: "Czy na pewno chcesz usunąć to zgłoszenie?",
      en: "Are you sure you want to delete this application?",
      ua: "Ви впевнені, що хочете видалити цю заявку?",
    },
    deleteArticle: {
      pl: "Czy na pewno chcesz usunąć ten artykuł?",
      en: "Are you sure you want to delete this article?",
      ua: "Ви впевнені, що хочете видалити цю статтю?",
    },
    deleteGalleryItem: {
      pl: "Czy na pewno chcesz usunąć ten element galerii?",
      en: "Are you sure you want to delete this gallery item?",
      ua: "Ви впевнені, що хочете видалити цей елемент галереї?",
    },
  },
  success: {
    applicationDeleted: {
      pl: "Zgłoszenie zostało pomyślnie usunięte!",
      en: "Application successfully deleted!",
      ua: "Заявку успішно видалено!",
    },
    articleDeleted: {
      pl: "Artykuł został pomyślnie usunięty!",
      en: "Article successfully deleted!",
      ua: "Статтю успішно видалено!",
    },
    galleryItemDeleted: {
      pl: "Element galerii został pomyślnie usunięty!",
      en: "Gallery item successfully deleted!",
      ua: "Елемент галереї успішно видалено!",
    },
  },
  errors: {
    deleteError: {
      pl: "Błąd podczas usuwania",
      en: "Error deleting item",
      ua: "Помилка видалення",
    },
    fetchError: {
      pl: "Błąd podczas pobierania danych",
      en: "Error fetching data",
      ua: "Помилка завантаження даних",
    },
  },
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

const getLocalizedValue = <T>(
  map: Record<string, T>,
  locale: string,
  fallback: string = "pl"
): T => map[locale] || map[fallback];

export const getUIMessage = (
  category: keyof typeof UI_MESSAGES,
  key: string,
  locale: string = "pl"
) => {
  const categoryMap = UI_MESSAGES[category] as Record<
    string,
    Record<string, string>
  >;
  const messageMap = getLocalizedValue(categoryMap, locale);
  return messageMap[key];
};
