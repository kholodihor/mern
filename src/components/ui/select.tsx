"use client";

import { useFilters } from "@/stores/useFilters";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface CustomDropdownProps {
  options: string[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations("Filters");
  const { setFilters, filters } = useFilters();

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const handleOptionClick = (option: string): void => {
    setFilters([option]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border
         border-white/20 bg-black/80 backdrop-blur-sm px-4 py-3 text-white text-sm
         hover:border-white/40 transition-all duration-200 ease-in-out"
        onClick={toggleDropdown}
      >
        <span className="font-medium">{t(`categories.${filters[0]}`)}</span>
        <span
          className={`ml-2 text-xs transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""
            }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 mt-2 max-h-60 overflow-y-auto rounded-lg 
          border border-white/20 bg-black/90 backdrop-blur-sm shadow-lg 
          transition-all duration-200 ease-in-out scrollbar-thin scrollbar-track-transparent 
          scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">
          {options.map((option, index) => (
            <li
              key={index}
              className={`cursor-pointer px-4 py-3 text-sm transition-colors duration-200 
                hover:bg-white/10 ${filters[0] === option ? 'bg-white/5' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {t(`categories.${option}`)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
