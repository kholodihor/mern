export function getHoursSince(dateString: string): number {
  let date: Date;
  const currentDate = new Date();

  // Handle MM/DD/YYYY format from database
  if (dateString.includes("/")) {
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [month, day, year] = parts;
      date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    } else {
      date = new Date(dateString);
    }
  } else {
    date = new Date(dateString);
  }

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Некоректний рядок дати: ${dateString}`);
  }

  const diffInMilliseconds = currentDate.getTime() - date.getTime();
  return diffInMilliseconds / (1000 * 60 * 60);
}

export function isWithin48Hours(dateString: string): boolean {
  const hours = getHoursSince(dateString);
  return hours >= 0 && hours <= 48;
}
