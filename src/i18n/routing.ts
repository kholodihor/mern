import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["pl", "en", "ua"],
  defaultLocale: "pl",
  localePrefix: "never",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

export type Locale = "pl" | "en" | "ua";
