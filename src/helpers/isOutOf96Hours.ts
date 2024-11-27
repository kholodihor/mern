export function isOutOf96Hours(dateString: string): boolean {
  const date = new Date(dateString);
  const currentDate = new Date();

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided.");
  }

  const diffInMilliseconds = currentDate.getTime() - date.getTime();

  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return Math.abs(diffInHours) >= 96;
}

