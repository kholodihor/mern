export function isWithin96Hours(dateString: string): boolean {
  const date = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMilliseconds = Math.abs(currentDate.getTime() - date.getTime());

  // Convert milliseconds to hours
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  // Check if the difference is within 48 hours
  return diffInHours >= 96;
}
