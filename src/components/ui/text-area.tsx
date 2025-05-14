/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  errorText?: string;
}

const TextArea = forwardRef(function TextArea(
  { title, errorText, value = "", ...rest }: TextAreaProps,
  _ref: ForwardedRef<HTMLInputElement>
) {
  const inputClassName = clsx(
    "w-full outline-none rounded-[0.7rem] border min-h-[150px] py-2 px-4 placeholder:text-sm bg-black",
    {
      "border-red-500 caret-error outline-red-500 focus:outline-red-500":
        errorText, // Apply error styles when errorText exists
      "border-lightgrey focus:outline-none": !errorText, // Apply light grey border and no outline focus when no error
    }
  );

  return (
    <div
      className={clsx("w-full min-w-[100px] max-w-[600px]", {
        "text-error": errorText,
        "text-inherit": !errorText,
      })}
    >
      {!!title && (
        <label htmlFor={title} className="text-sm font-medium">
          {title}
        </label>
      )}
      <textarea {...rest} id={title} value={value} className={inputClassName} />

      {errorText && <span className="ml-2 text-xs">{errorText}</span>}
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
