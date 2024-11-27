'use client'

import { useState } from "react";

const ChevronLeft = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <svg
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      width="45" height="123" viewBox="0 0 65 123" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 0.5L1 61.5L64 122.5" stroke={isHovered ? '#ffffff' : '#666666'} strokeLinecap="round" />
    </svg>

  )
}

export default ChevronLeft
