import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  errorText?: string;
}

const TextArea = forwardRef(function TextArea(
  { title, errorText, value = "", ...rest }: TextAreaProps,
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
      <textarea {...rest} id={title} value={value} className={inputClassName} />

      {errorText && <span className=" ml-2 text-xs">{errorText}</span>}
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;