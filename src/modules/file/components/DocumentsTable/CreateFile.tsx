import { useEffect, useState } from "react";
import * as Yup from "yup";
import { api } from "../../../../shared/clients/APIClient";
import { CreateFileResponse } from "../../typings/file";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../../shared/styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../../shared/styleguide/Button/Button";
import { FileInput } from "../../../../shared/styleguide/Inputs/FileInput/FileInput";
import { FiX } from "react-icons/fi";
import { useFileContext } from "../../context/FileProvider";

const initialValues = {
  name: "",
  file: null,
};

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),

  file: Yup.mixed()
    .required("Insira um arquivo")
    .test({
      name: "fileSize",
      message: "Arquivo grande demais.",
      test: (value: any) => {
        return value.size <= 1024 * 1024;
      },
    })
    .test({
      name: "fileType",
      message: "Tipo de arquivo não suportado.",
      test: (value: any) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "application/pdf"].includes(
          value.type
        );
      },
    }),
});

interface FormikValues {
  name: string;
  file: File | null;
}

interface CreateFileProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFile = ({ openModal, setOpenModal }: CreateFileProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useFileContext();

  const [requestError, setRequestError] = useState<string | undefined>("");
  const [requestSuccess, setRequestSuccess] = useState<string | undefined>("");

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

  const handleCreate = async ({ name, file }: FormikValues) => {
    try {
      setLoading(true);
      const createBody = new FormData();
      createBody.append("name", name);

      if (file) {
        createBody.append("file", file);
      }

      const response = await api.post<CreateFileResponse>("/file", createBody);

      const created = response.status === 201;

      if (created) {
        setOpenModal(false);

        dispatch({
          type: "ADD_FILE",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!openModal) {
    return <></>;
  }

  return (
    <>
      <div className="opacity-40 bg-black inset-0 fixed z-[1]"></div>

      <div className="absolute p-5 bg-white rounded-lg shadow-lg z-[1] max-w-xl w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-xl">Cadastrar</div>
          <div className="cursor-pointer" onClick={() => setOpenModal(false)}>
            <FiX size={24} />
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreate}
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
      </div>
    </>
  );
};

export { CreateFile };
