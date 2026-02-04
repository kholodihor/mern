"use client";

import type { SVGProps } from "react";

const ChevronLeft = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 123"
      fill="none"
      className={`transition-colors ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M64 0.5L1 61.5L64 122.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ChevronLeft;
