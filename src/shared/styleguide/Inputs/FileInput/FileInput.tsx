import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

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
  const classes = classNames({
    "focus:border-brand-500": !error,
    "!border-error-300": error,

    "text-sm text-grey-500 file:text-sm file:text-white file:border file:border-black hover:file:cursor-pointer hover:file:opacity-80":
      true,
  });

  return (
    <>
      <div>
        <input
          className={`${classes} text-sm placeholder:text-gray-300   peer w-full rounded border border-gray-300 text-gray-900 focus:shadow-md focus:shadow-brand-500/10 focus:outline-0 focus:border-brand-500 block  mb-5 cursor-pointer bg-white focus:outline-none `}
          type="file"
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
