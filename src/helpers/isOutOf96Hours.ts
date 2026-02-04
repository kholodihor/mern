export function isOutOf96Hours(dateString: string): boolean {
  let date: Date;
  const currentDate = new Date();

  // Handle MM/DD/YYYY format from database
  if (dateString.includes("/")) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      // Note: month is 0-indexed in JavaScript Date
      date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    } else {
      date = new Date(dateString);
    }
  } else {
    // Try the default Date constructor for other formats
    date = new Date(dateString);
  }

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date string provided: ${dateString}`);
  }

  const diffInMilliseconds = currentDate.getTime() - date.getTime();

  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return Math.abs(diffInHours) >= 96;
}
