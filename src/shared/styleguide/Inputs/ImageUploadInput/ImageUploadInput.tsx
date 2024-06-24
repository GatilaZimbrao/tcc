import React, { useState, ChangeEvent, DragEvent, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

type ImageUploadInputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  error?: string;
  initialValue?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const ImageUploadInput = ({
  name,
  error,
  initialValue,
  setFieldValue,
  disabled,
}: PropsWithClassName<ImageUploadInputProps>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialValue) {
      fetch(initialValue)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          }
          return null;
        })
        .then((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setPreview(url);
          }
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          setPreview(null);
        });
    }
  }, [initialValue]);

  const handleImageChange = (file: File | null) => {
    setFieldValue(name, file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleImageChange(file ?? null);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleImageChange(file);
  };

  const containerClasses = classNames(
    "flex flex-col items-center justify-center w-full"
  );
  const dropzoneClasses = classNames(
    "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50",
    {
      "hover:bg-gray-100": !disabled,
      "opacity-50 cursor-not-allowed": disabled,
      "bg-cover bg-center": preview,
      "border-blue-500 bg-blue-100": isDragging,
    }
  );

  return (
    <div className={containerClasses}>
      <label
        htmlFor="dropzone-file"
        className={dropzoneClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById(name)?.click()}
        style={{
          backgroundImage: preview ? `url(${preview})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100px",
          height: "100px",
        }}
      >
        {!preview && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiImage className="mb-2" size={35} color="#2A2A2A" />
            <span className="text-sm font-semibold text-gray-500">Foto</span>
          </div>
        )}
        <input
          id={name}
          name={name}
          type="file"
          className="hidden"
          disabled={disabled}
          onChange={handleInputChange}
        />
      </label>

      {error && <ErrorMessage error={error} />}
    </div>
  );
};

ImageUploadInput.defaultProps = {
  type: "file",
} as Partial<ImageUploadInputProps>;

export { ImageUploadInput };
