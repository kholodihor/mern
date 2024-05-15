import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorText?: string;
}

const TextInput = forwardRef(function TextInput(
  { title, errorText, value = "", ...rest }: TextInputProps,
  _ref: ForwardedRef<HTMLInputElement>
) {
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
        </label>
      )}
      <input {...rest} id={title} value={value} className={inputClassName} />

      {errorText && <span className="text-xs">{errorText}</span>}
    </div>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;
