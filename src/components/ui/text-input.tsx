/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorText?: string;
}

const TextInput = forwardRef(function TextInput(
  { title, errorText, value = "", ...rest }: TextInputProps,
  _ref: ForwardedRef<HTMLInputElement>
) {
  const inputClassName = `w-full outline-none rounded-[0.7rem] border border-white
   py-2 px-4 placeholder:text-sm bg-black
      ${
        errorText
          ? "border-red-500 caret-error outline-red-500 focus:outline-red-500"
          : "border-lightgrey focus:outline-none"
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
        </label>
      )}
      <input {...rest} id={title} value={value} className={inputClassName} />

      {errorText && <span className="text-xs">{errorText}</span>}
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
