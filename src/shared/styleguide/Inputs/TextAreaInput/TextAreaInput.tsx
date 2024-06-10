import React from "react";
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type TextAreaInputProps = React.HTMLProps<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  compact?: boolean;
  block?: boolean;
};

const TextAreaInput = ({
  label,
  className,
  error,
  disabled,
  compact = false,
  block = true,
  ...rest
}: React.PropsWithChildren<TextAreaInputProps>) => {
  const classes = classNames(className, {
    "focus:border-brand-500": !error,
    "!border-error-300": error,
    "px-3 py-2": !compact,
  });

  const labelClasses = classNames({
    "peer-focus:text-brand-500 peer-placeholder-shown:text-gray-600 text-gray-600":
      !error,
    "peer-focus:text-error-300 peer-placeholder-shown:text-error-300 text-error-300":
      error,
  });

  return (
    <>
      <div className={`${block ? "w-full" : "w-fit"}`}>
        <div className="flex relative">
          <textarea
            className={`text-sm placeholder:text-gray-300 min-h-[38px] peer w-full rounded border border-gray-300 text-gray-900 focus:shadow-md focus:shadow-brand-500/10 focus:outline-0 ${classes}`}
            placeholder=" "
            disabled={disabled}
            {...rest}
          />
          <label
            className={`${labelClasses} pointer-events-none absolute top-0 -translate-y-1/2 left-3 bg-white px-1 text-xs transition-all duration-150 ease-out hover:ease-in peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:text-brand-500`}
          >
            {label}
          </label>
          {!disabled && <span className="shadow-animation-peer"></span>}
        </div>

        <ErrorMessage error={error} />
      </div>
    </>
  );
};

TextAreaInput.defaultProps = {
  rows: 3,
} as TextAreaInputProps;

export { TextAreaInput };
