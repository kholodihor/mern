import { getHoursSince } from "./isWithin48Hours";

export function isOutOf96Hours(dateString: string): boolean {
  return getHoursSince(dateString) >= 96;
}
