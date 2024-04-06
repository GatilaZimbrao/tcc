import classNames from "classnames";
import { FieldProps } from "formik";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Props {
  label: string;
  options: string[];
  field: FieldProps["field"];
  initialValue?: string;
  error?: string;
}

export const CustomSelect: React.FC<Props> = ({
  label,
  options,
  field,
  initialValue,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    initialValue ?? null
  );

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    field.onChange({ target: { value: option, name: field.name } });
    field.onBlur({ target: { value: option, name: field.name } });
  };

  const containerClasses = classNames("w-full", {
    "peer-focus:shadow-brand-500/10 peer-placeholder-shown:shadow-md peer-placeholder-shown:shadow-brand-500/10 peer-focus:shadow-md peer-focus:shadow-brand-500/10 peer-focus:border-brand-500":
      !error,
    "!border-error-300": error,
  });

  const labelClasses = classNames({
    "peer-focus:text-brand-500 peer-placeholder-shown:text-gray-600 text-gray-600":
      !error,
    "peer-focus:text-error-300 peer-placeholder-shown:text-error-300 text-error-300":
      error,
  });

  return (
    <>
      <div
        className={`${containerClasses} cursor-pointer border border-gray-300 rounded-md py-2 px-3 relative`}
      >
        {selectedOption && (
          <label
            className={`${labelClasses} pointer-events-none absolute top-0 -translate-y-1/2 left-3 bg-white px-1 text-xs transition-all duration-150 ease-out hover:ease-in peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:text-brand-500`}
          >
            {label}
          </label>
        )}

        <div
          className={`text-sm placeholder:text-gray-300 peer w-full rounded bordertext-gray-900 ${
            selectedOption && "capitalize"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption : label}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </span>
        </div>
        {isOpen && (
          <ul className="absolute w-full z-10 top-full left-0 bg-white border border-gray-300 rounded-md text-sm text-gray-900">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer hover:bg-gray-100 px-3 py-2 text-sm text-gray-900 capitalize ${
                  selectedOption == option && "bg-brand-100 hover:bg-brand-100"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
