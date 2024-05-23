import classNames from "classnames";
import { FieldProps } from "formik";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiX } from "react-icons/fi";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface Option {
  value: string | number | boolean;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  field: FieldProps["field"];
  initialValue?: (string | number | boolean)[];
  error?: string;
}

export const MultiSelect: React.FC<Props> = ({
  label,
  options,
  field,
  initialValue = [],
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] =
    useState<(string | number | boolean)[]>(initialValue);

  const handleOptionClick = (option: Option) => {
    const isSelected = selectedOptions.includes(option.value);
    let newSelectedOptions;

    if (isSelected) {
      newSelectedOptions = selectedOptions.filter(
        (value) => value !== option.value
      );
    } else {
      newSelectedOptions = [...selectedOptions, option.value];
    }

    setSelectedOptions(newSelectedOptions);
    field.onChange({ target: { value: newSelectedOptions, name: field.name } });
  };

  const handleRemoveOption = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter(
      (value) => value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    field.onChange({ target: { value: newSelectedOptions, name: field.name } });
  };

  const containerClasses = classNames(
    "relative w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer text-sm placeholder:text-gray-300 peer w-full rounded border border-gray-300 text-gray-900 focus:shadow-md focus:shadow-brand-500/10 focus:outline-0",
    {
      "focus:border-brand-500": !error,
      "!border-error-300": error,
      peer: true,
    }
  );

  const labelClasses = classNames(
    "pointer-events-none absolute z-[1] left-3 bg-white px-1 text-xs transition-all duration-150 ease-out hover:ease-in",
    {
      "peer-focus:text-brand-500 peer-placeholder-shown:text-gray-600 text-gray-600":
        !error,
      "peer-focus:text-error-300 peer-placeholder-shown:text-error-300 text-error-300":
        error,
      "top-0 -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:text-brand-500":
        true,
    }
  );

  return (
    <>
      <div className="w-full relative">
        <label className={labelClasses}>
          {selectedOptions.length > 0 ? label : ""}
        </label>
        <div className={containerClasses} onClick={() => setIsOpen(!isOpen)}>
          <div className="flex flex-wrap gap-1">
            {selectedOptions.map((selectedValue) => {
              const option = options.find((opt) => opt.value === selectedValue);
              return (
                <div
                  key={`selected-option-${selectedValue}`}
                  className="flex items-center bg-gray-200 rounded-sm px-2 py-1"
                >
                  <span className="text-xs leading-none">{option?.label}</span>
                  <FiX
                    className="ml-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(option!);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div
            className={`text-sm placeholder:text-gray-300 w-full rounded border-none text-gray-900 ${
              selectedOptions.length > 0 && "capitalize"
            }`}
          >
            {selectedOptions.length === 0 && (
              <span className="text-gray-900">{label}</span>
            )}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
            </span>
          </div>
          {isOpen && (
            <ul className="absolute w-full max-h-36 overflow-y-auto z-10 top-full left-0 bg-white border border-gray-300 rounded-md text-sm text-gray-900 mt-1">
              {options.map((option) => (
                <li
                  key={`custom-select-${option.label}`}
                  onClick={() => handleOptionClick(option)}
                  className={`cursor-pointer hover:bg-gray-100 px-3 py-2 text-sm text-gray-900 capitalize ${
                    selectedOptions.includes(option.value) &&
                    "bg-brand-100 hover:bg-brand-100"
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ErrorMessage error={error} />
      </div>
    </>
  );
};
