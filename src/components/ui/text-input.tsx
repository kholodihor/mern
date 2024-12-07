/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorText?: string;
}

const TextInput = forwardRef(function TextInput(
  { title, errorText, value = "", ...rest }: TextInputProps,
  _ref: ForwardedRef<HTMLInputElement>
) {
  const inputClassName = clsx(
    "w-full outline-none rounded-[0.7rem] border py-2 px-4 placeholder:text-sm bg-black",
    {
      "border-white": !errorText,
      "border-red-500 caret-error outline-red-500 focus:outline-red-500":
        errorText,
      "border-lightgrey focus:outline-none": !errorText,
    }
  );

  return (
    <div
      className={clsx("w-full min-w-[100px] max-w-[500px]", {
        "text-error": errorText,
        "text-inherit": !errorText,
      })}
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
