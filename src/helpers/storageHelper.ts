import "client-only";

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue === null || stickyValue === "undefined") return defaultValue;
    return JSON.parse(stickyValue) as T;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail — storage may be full or disabled (private mode)
  }
}
