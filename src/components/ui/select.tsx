"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useFilters } from "@/stores/useFilters";

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
    <div className="relative w-full sm:w-72 xl:w-[360px] 2xl:w-72">
      <div
        className="flex cursor-pointer items-center justify-between rounded border border-white bg-black px-4 py-2 text-white"
        onClick={toggleDropdown}
      >
        {t(`categories.${filters[0]}`)}
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <ul className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded border border-white bg-black">
          {options.map((option, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-white hover:text-black"
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
