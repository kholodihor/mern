export function isOutOf96Hours(dateString: string): boolean {
  let date: Date;
  const currentDate = new Date();

  // Check if the date is in DD/MM/YYYY format
  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/");
    // Note: month is 0-indexed in JavaScript Date
    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else {
    // Try the default Date constructor for other formats
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided: " + dateString);
  }

  const diffInMilliseconds = currentDate.getTime() - date.getTime();

  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return Math.abs(diffInHours) >= 96;
}
