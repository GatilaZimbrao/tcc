import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

import { FileInput as FileInputComponent, Label } from "flowbite-react";

type FileInputProps = React.HTMLProps<HTMLInputElement> & {
  error?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const FileInput = ({
  error,
  setFieldValue,
}: PropsWithClassName<FileInputProps>) => {
  return (
    <>
      <div>
        <div>
          {/* <Label htmlFor="file-upload-helper-text" value="Upload file" /> */}
        </div>
        <FileInputComponent
          id="file-upload-helper-text"
          helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
          name="file"
          lang="pt-BR"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.currentTarget.files) {
              setFieldValue("file", event.currentTarget.files[0]);
            }
          }}
        />
      </div>

      <div className={"w-full"}>
        <ErrorMessage error={error} />
      </div>
    </>
  );
};

FileInput.defaultProps = {
  type: "text",
} as FileInputProps;

export { FileInput };
