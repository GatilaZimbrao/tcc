import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { api } from "../../../../shared/clients/APIClient";
import { File as FileModel, UpdateFileResponse } from "../../typings/file";
import { Spinner } from "../../../../shared/styleguide/Spinner/Spinner";
import { useFileContext } from "../../context/FileProvider";
import Modal from "../../../../shared/styleguide/Modal/Modal";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../../shared/styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../../shared/styleguide/Button/Button";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { validateFileExtension } from "../../../../shared/utils/validateFileExtension";
import { FileInput } from "../../../../shared/styleguide/Inputs/FileInput/FileInput";

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),

  file: Yup.mixed()
    .required("Insira um arquivo")
    .test({
      name: "fileCheck",
      message: "Insira um arquivo",
      test: (value: any) => {
        if (!value) return false;

        if (typeof value === "object") {
          return true;
        } else if (typeof value === "string") {
          return value.trim().length > 0;
        }

        return false;
      },
    })
    .test({
      name: "fileSize",
      message: "Arquivo grande demais. (Max: 5MB)",
      test: (value: any) => {
        if (typeof value === "object" && value.size) {
          const FILE_SIZE_LIMIT_MB = 5;
          const FILE_SIZE_LIMIT = FILE_SIZE_LIMIT_MB * 1024 * 1024;

          return value.size <= FILE_SIZE_LIMIT;
        }

        return true;
      },
    })
    .test({
      name: "fileType",
      message: "Tipo de arquivo não suportado.",
      test: (value: any) => {
        if (typeof value === "object" && value.name) {
          return validateFileExtension(value.name);
        }

        return true;
      },
    }),
});

interface FormikValues {
  name: string;
  file: File | string | null;
}

interface UpdateFileProps {
  item: FileModel;
}

const UpdateFile = ({ item }: UpdateFileProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useFileContext();

  const [requestError, setRequestError] = useState<string | undefined>("");
  const [requestSuccess, setRequestSuccess] = useState<string | undefined>("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (requestError) {
      setTimeout(() => {
        setRequestError("");
      }, 2000);
    }
  }, [requestError]);

  useEffect(() => {
    if (requestSuccess) {
      setTimeout(() => {
        setRequestSuccess("");
      }, 6000);
    }
  }, [requestSuccess]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = async ({ name, file }: FormikValues) => {
    try {
      setLoading(true);

      const createBody = new FormData();
      createBody.append("name", name);

      if (file) {
        if (typeof file == "object") {
          createBody.append("file", file);
        } else {
          createBody.append("file", new File([], item.file_name));
        }
      }
      const response = await api.put<UpdateFileResponse>(
        `/file/${item.id}`,
        createBody
      );

      const updated = response.status === 200;

      if (updated) {
        handleCloseModal();

        location.reload();
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          setRequestError(error.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    name: item.name,
    file: item.file_name,
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Editar"
        children={
          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdate}
            validationSchema={schema}
          >
            {({ setFieldValue }) => (
              <Form className="flex grow flex-col justify-between">
                <>
                  <div className="">
                    <Field name="name">
                      {({ field, meta }: FieldProps) => (
                        <TextInput
                          label="Digite o nome do documento:"
                          {...field}
                          value={field.value}
                          error={meta.touched ? meta.error : ""}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field name="file">
                      {({ meta }: FieldProps) => (
                        <FileInput
                          error={meta.touched ? meta.error : ""}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </Field>
                  </div>

                  {requestError && (
                    <div className="mt-2">
                      <ErrorMessage error={requestError} />
                    </div>
                  )}
                  {requestSuccess && (
                    <div className="mt-2">
                      <SuccessMessage message={requestSuccess} />
                    </div>
                  )}
                </>

                <div className="flex justify-end mt-4">
                  <Button
                    loading={loading}
                    apperance="primary"
                    size="sm"
                    type="submit"
                  >
                    <span className="font-semibold">ENVIAR</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        }
      />
      <button
        className="p-4 shadow-md bg-gray-50 cursor-pointer rounded"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : <FiEdit />}
      </button>
    </>
  );
};

export { UpdateFile };
