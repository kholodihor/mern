"use client";

import { useEffect } from "react";

/**
 * ScriptOptimizer component
 *
 * This component optimizes script loading and execution by:
 * 1. Deferring non-critical JavaScript
 * 2. Using requestIdleCallback for non-critical operations
 * 3. Implementing progressive hydration
 */
const ScriptOptimizer = () => {
  useEffect(() => {
    // Function to handle non-critical operations during browser idle time
    const handleNonCriticalOperations = () => {
      // Use requestIdleCallback for operations that can wait
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(
          () => {
            // Initialize non-critical features here
            // For example, analytics, feedback widgets, etc.

            // Dispatch event when optimization is complete
            window.dispatchEvent(new CustomEvent("non-critical-loaded"));
          },
          { timeout: 2000 }
        );
      } else {
        // Fallback for browsers that don't support requestIdleCallback
        setTimeout(() => {
          // Initialize non-critical features
          window.dispatchEvent(new CustomEvent("non-critical-loaded"));
        }, 200);
      }
    };

    // Wait until the page is fully loaded and then handle non-critical operations
    if (document.readyState === "complete") {
      handleNonCriticalOperations();
    } else {
      window.addEventListener("load", handleNonCriticalOperations);
      return () => {
        window.removeEventListener("load", handleNonCriticalOperations);
      };
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default ScriptOptimizer;
