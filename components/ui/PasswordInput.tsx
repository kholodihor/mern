"use client";

import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from "react";

interface SignInPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorText?: string;
  isRequired?: boolean;
}

const SignInPassword = forwardRef(function SignInPassword(
  { title, errorText, value = "", isRequired, ...rest }: SignInPasswordProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [isEditing, setIsEditing] = useState(false);
  const inputType = isEditing ? "text" : "password";
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const inputClassName = `w-full outline-none rounded-md border border-blue-700 p-2 placeholder:text-sm bg-black
      ${
        errorText
          ? "border-red-500 caret-error outline-red-500 focus:outline-red-500"
          : "border-lightgrey focus:outline-blue-700 focus:shadow-md focus:shadow-blue-700"
      }
    `;

  return (
    <div
      className={`w-full min-w-[100px] max-w-[500px] ${
        errorText ? "text-error" : "text-inherit"
      }`}
    >
      {!!title && (
        <label htmlFor={title} className="text-sm font-medium">
          {title}
          {isRequired && <span className="text-error">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          {...rest}
          id={title}
          value={value}
          className={inputClassName}
          onBlur={handleBlur}
          type={inputType}
          ref={ref}
        />
        {/* <div className="absolute right-[16px] top-[9px] ">
          <button type="button" onClick={handleEditToggle}>
            {isEditing ? <EyeIcon /> : <NotEyeIcon />}
          </button>
        </div> */}
        {errorText && <span className="text-xs">{errorText}</span>}
      </div>
    </div>
  );
});

SignInPassword.displayName = "SignInPassword";

export default SignInPassword;
