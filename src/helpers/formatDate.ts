export function formatDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  // Convert the seconds to milliseconds (ignoring nanoseconds for simplicity)
  const date = new Date(timestamp.seconds * 1000);

  // Extract the day, month, and year
  const day: string = String(date.getDate()).padStart(2, "0");
  const month: string = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year: number = date.getFullYear();

  // Return the formatted date
  return `${day}.${month}.${year}`;
}

export const formatReviewDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Formats a date string to DD/MM/YYYY format with leading zeros
 * @param dateString - The date string to format (can be in various formats)
 * @returns A formatted date string in DD/MM/YYYY format with leading zeros
 */
export const formatDateWithSlashes = (dateString: any): string => {
  let date: Date;

  // Handle different date formats
  if (typeof dateString === 'string' && dateString.includes("/")) {
    // Handle MM/DD/YYYY format from database (e.g., "05/14/2025")
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      date = new Date(dateString);
    }
  } else if (dateString && typeof dateString === 'object' && dateString.seconds) {
    // Handle Firebase timestamp objects
    date = new Date(dateString.seconds * 1000);
  } else {
    // Default date parsing for other formats
    date = new Date(dateString);
  }

  // Make sure the date is valid
  if (isNaN(date.getTime())) {
    return typeof dateString === 'string' ? dateString : 'Invalid date';
  }

  // Format with leading zeros - always display as DD/MM/YYYY
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
