"use client";

import { useEffect } from "react";

/**
 * BfCacheHandler component
 *
 * This component optimizes the application for back/forward cache (bfcache)
 * by handling the pageshow event and properly restoring application state
 * when navigating with browser back/forward buttons.
 */
const BfCacheHandler = () => {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // Check if the page is being restored from bfcache
      if (event.persisted) {
        // Force a refresh of dynamic content that might be stale
        // This is especially important for data that might have changed
        // while the page was in the bfcache

        // Dispatch a custom event that components can listen for
        window.dispatchEvent(new CustomEvent("bfcache:restore"));

        // Update analytics to track bfcache navigation
        if (typeof window.gtag === "function") {
          window.gtag("event", "bfcache_restore", {
            event_category: "Navigation",
            event_label: window.location.pathname,
          });
        }
      }
    };

    // Add event listener for pageshow event
    window.addEventListener("pageshow", handlePageShow);

    // Clean up event listener
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default BfCacheHandler;
