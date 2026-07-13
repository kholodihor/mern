export type Locale = "pl" | "en" | "ua";

const INTL_LOCALE_MAP: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-GB",
  ua: "uk-UA",
};

const getIntlLocale = (locale?: Locale): string =>
  INTL_LOCALE_MAP[locale ?? "pl"] ?? "pl-PL";

const toDate = (input: string | { seconds: number; nanoseconds?: number } | Date): Date => {
  if (input instanceof Date) return input;
  if (input && typeof input === "object" && "seconds" in input) {
    return new Date(input.seconds * 1000);
  }
  if (typeof input === "string" && input.includes("/")) {
    const parts = input.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    }
  }
  return new Date(input);
};

export function formatDate(
  timestamp: { seconds: number; nanoseconds: number },
  locale?: Locale,
): string {
  const date = toDate(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export const formatReviewDate = (isoDate: string, locale?: Locale): string =>
  formatDate({ seconds: new Date(isoDate).getTime() / 1000, nanoseconds: 0 }, locale);

export const formatDateWithSlashes = (
  dateString: string | { seconds: number } | Date,
  locale?: Locale,
): string => {
  const date = toDate(dateString);
  if (Number.isNaN(date.getTime())) {
    return typeof dateString === "string" ? dateString : "Некоректна дата";
  }
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};
