export function generateSlug(text: string): string {
  return (
    text
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing whitespace
      // Replace accented characters with their base equivalents
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Replace common special characters with their equivalents
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ñ]/g, "n")
      .replace(/[ç]/g, "c")
      .replace(/[ß]/g, "ss")
      .replace(/[æ]/g, "ae")
      .replace(/[œ]/g, "oe")
      // Remove all special symbols, punctuation, and non-alphanumeric characters except spaces and hyphens
      .replace(/[^a-z0-9\s-]/g, "")
      // Replace multiple spaces with single space
      .replace(/\s+/g, " ")
      // Replace spaces with hyphens
      .replace(/\s/g, "-")
      // Replace multiple hyphens with single hyphen
      .replace(/-+/g, "-")
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}
