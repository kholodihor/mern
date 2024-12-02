/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";

interface MultiselectProps {
  options: { value: string; label: string }[];
  value: MultiValue<{ value: string; label: string }>;
  onChange: (value: MultiValue<{ value: string; label: string }>) => void;
  errorText?: string;
  placeholder?: string;
  title?: string;
}

const Multiselect = forwardRef(function Multiselect(
  { options, value, onChange, errorText, placeholder, title }: MultiselectProps,
  _ref: ForwardedRef<HTMLDivElement>
) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure client-side rendering
  }, []);

  if (!mounted) {
    return null; // Don't render the Select on the server side
  }

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused
        ? "1px solid #ffffff" // White border when focused
        : "1px solid #ffffff", // White border when not focused
      boxShadow: "none",
      "&:hover": {
        borderColor: "#ffffff", // White border on hover
      },
      borderRadius: "0.7rem",
      backgroundColor: "#000000", // Black background for control
      padding: "2px",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#000000", // Black background for dropdown menu
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#333333" : "#000000", // Darker gray on hover, black otherwise
      color: state.isFocused ? "#ffffff" : "#cccccc", // White text on hover, light gray otherwise
      "&:active": {
        backgroundColor: "#444444", // Even darker gray when active
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      fontSize: "14px",
      color: "#aaaaaa",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#333333",
      borderRadius: "0.5rem",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "#ffffff",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#ff0000",
        color: "#ffffff",
      },
    }),
  };

  return (
    <div
      className={`w-full min-w-[100px] max-w-[500px] ${errorText ? "text-error" : "text-inherit"}`}
    >
      {!!title && (
        <label htmlFor={title} className="text-sm font-medium mb-1 block">
          {title}
        </label>
      )}
      <Select
        id="custom-select"
        isMulti
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        styles={customStyles}
        aria-live="off"
      />
      {errorText && <span className="text-xs text-red-500">{errorText}</span>}
    </div>
  );
});

Multiselect.displayName = "Multiselect";

export default Multiselect;
