export function generateSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      // Replace accented characters with their base equivalents via NFD decomposition
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Handle ligatures and non-decomposable letters not handled by NFD
      .replace(/ß/g, "ss")
      .replace(/æ/g, "ae")
      .replace(/œ/g, "oe")
      .replace(/ø/g, "o")
      .replace(/[ðđ]/g, "d")
      .replace(/þ/g, "th")
      .replace(/ł/g, "l")
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
