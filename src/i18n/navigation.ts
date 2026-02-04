import { createNavigation } from "next-intl/navigation";
import { type Locale, routing } from "./routing";

export const locales: Locale[] = ["pl", "en", "ua"];

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/news": "/news",
  "/contacts": "/contacts",
  "/services": "/services",
};

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
