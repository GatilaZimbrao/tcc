import { useEffect, useState } from "react";
import * as Yup from "yup";
import { api } from "../../../../shared/clients/APIClient";
import { CreateFileResponse } from "../../typings/file";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../../shared/styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../../shared/styleguide/Button/Button";
import { Link } from "react-router-dom";
import { FileInput } from "../../../../shared/styleguide/Inputs/FileInput/FileInput";

const initialValues = {
  name: "",
  type: "",
  file: null,
};

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  type: Yup.string().required("Digite um tipo válido"),

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
  type: string;
  file: File | null;
}

const CreateFile = () => {
  initialValues.file;
  const [loading, setLoading] = useState(false);
  // const { dispatch } = useFileContext();

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

  const handleCreate = async ({ name, type, file }: FormikValues) => {
    try {
      setLoading(true);

      console.log("name", name);
      console.log("type", type);
      console.log("file", file);
      const createBody = new FormData();
      createBody.append("name", name);
      createBody.append("type", type);

      if (file) {
        createBody.append("file", file);
      }
      // createBody.append("file", fileInput.files[0]);

      const response = await api.post<CreateFileResponse>(
        "/file/create",
        createBody
      );

      const created = response.status === 201;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="opacity-40 bg-black inset-0 fixed z-[1]"></div>

      <div className="absolute p-10 bg-white rounded-lg shadow-lg z-[1]">
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
                  <div className="mt-4">
                    <Field name="type">
                      {({ field, meta }: FieldProps) => (
                        <TextInput
                          label="Digite o tipo do documento:"
                          {...field}
                          value={field.value}
                          error={meta.touched ? meta.error : ""}
                        />
                      )}
                    </Field>
                  </div>
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

              <div className="flex justify-between mt-4">
                <Button compact apperance="link" size="sm">
                  <Link to="/education" className="text-link">
                    Voltar
                  </Link>
                </Button>
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
