"use client";

import { useEffect } from "react";

export const useBodyScrollLock = (shouldLock: boolean) => {
  useEffect(() => {
    if (!shouldLock) {
      return;
    }

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.paddingRight = `${scrollBarWidth}px`;

    document.body.classList.add("lock");

    return () => {
      document.body.classList.remove("lock");

      document.body.style.paddingRight = "0px";
    };
  }, [shouldLock]);
};

// "use client";

// import { useEffect } from "react";

// export const useBodyScrollLock = (shouldLock: boolean) => {
//   useEffect(() => {
//     const originalOverflow = window.getComputedStyle(document.body).overflow;
//     if (shouldLock) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow =
//         originalOverflow === "hidden" ? "auto" : originalOverflow;
//       document.body.style.overflowX = "hidden";
//     }
//     return () => {
//       document.body.style.overflow = originalOverflow;
//       document.body.style.overflowX = "hidden";
//     };
//   }, [shouldLock]);
// };
