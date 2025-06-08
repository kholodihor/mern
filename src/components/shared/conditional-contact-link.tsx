"use client";

import { usePathname } from "next/navigation";
import ContactLink from "./contact-link";

const ConditionalContactLink = () => {
  const pathname = usePathname();

  // Extract the path without the locale prefix
  const path = pathname.split("/").slice(2).join("/");
  const basePath = `/${path}`;

  // Define paths where the contact link should be shown
  const showOnPaths = [
    "/", // homepage
    "/about",
    "/gallery",
    "/services",
    "/news",
  ];

  // Check if current path is in the allowed list
  const shouldShow = showOnPaths.some((allowedPath) => {
    // For homepage, check if it's exactly the locale (e.g., /en, /pl, /ua)
    if (allowedPath === "/" && path === "") {
      return true;
    }
    // For other pages, check if the path starts with the allowed path
    return basePath === allowedPath || basePath.startsWith(`${allowedPath}/`);
  });

  // Only render the ContactLink if we're on an allowed path
  return shouldShow ? <ContactLink /> : null;
};

export default ConditionalContactLink;
