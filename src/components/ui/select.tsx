'use client'

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useFilters } from '@/stores/useFilters';

interface CustomDropdownProps {
  options: string[];
}

const CustomDropdown: React.FC<CustomDropdownProps> =
  ({ options }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const t = useTranslations("Filters");
    const { setFilters, filters } = useFilters();

    const toggleDropdown = (): void => setIsOpen(!isOpen);

    const handleOptionClick = (option: string): void => {
      setFilters([option]);
      setIsOpen(false);
    };

    console.log(options)

    return (
      <div className="relative w-full sm:w-72 xl:w-[360px] 2xl:w-72">
        <div
          className="bg-black text-white border border-white px-4 py-2 rounded cursor-pointer flex justify-between items-center"
          onClick={toggleDropdown}
        >
          {t(`categories.${filters[0]}`)}
          <span
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          >
            ▼
          </span>
        </div>
        {isOpen && (
          <ul className="absolute left-0 right-0 bg-black border border-white rounded mt-1 max-h-60 overflow-y-auto z-10">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-white hover:text-black cursor-pointer"
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
