export function formatDate(timestamp: { seconds: number; nanoseconds: number }): string {
  // Convert the seconds to milliseconds (ignoring nanoseconds for simplicity)
  const date = new Date(timestamp.seconds * 1000);

  // Extract the day, month, and year
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year: number = date.getFullYear();

  // Return the formatted date
  return `${day}.${month}.${year}`;
}