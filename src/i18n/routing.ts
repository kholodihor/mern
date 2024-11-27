import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export type Locale = 'pl' | 'en' | 'ua'

export const locales = ['pl', 'en', 'ua'];

export const pathnames = {
  "/": "/",
  "/about": "/about",
  "/news": "/news",
  "/contacts": "/contacts",
  "/services": "/services",
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'pl'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);