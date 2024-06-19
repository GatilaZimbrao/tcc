import { useEffect, useState } from "react";
import * as Yup from "yup";
import { api } from "../../../../shared/clients/APIClient";
import { CreateTeacherResponse } from "../../typings/teacher";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../../shared/styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../../shared/styleguide/Button/Button";
import { FiX } from "react-icons/fi";
import { useTeacherContext } from "../../context/TeacherProvider";
import { CustomSelect } from "../../../../shared/styleguide/Inputs/CustomSelect/CustomSelect";
import Modal from "../../../../shared/styleguide/Modal/Modal";
import { Spinner } from "../../../../shared/styleguide/Spinner/Spinner";
import { AxiosError } from "axios";
import { ImageUploadInput } from "../../../../shared/styleguide/Inputs/ImageUploadInput/ImageUploadInput";
import { validateImageExtension } from "../../../../shared/utils/validateImageExtension";

const initialValues = {
  name: "",
  image: null,
  education: "",
  linkLattes: "",
  type: "",
};

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  image: Yup.mixed()
    .required("Insira um arquivo")
    .test({
      name: "fileCheck",
      message: "Insira um arquivo",
      test: (value: any) => {
        if (!value) return false;

        if (typeof value != "object") {
          return false;
        }

        return true;
      },
    })
    .test({
      name: "fileSize",
      message: "Arquivo grande demais. (Max: 5MB)",
      test: (value: any) => {
        if (!value || !value.size) return false;
        const FILE_SIZE_LIMIT_MB = 5;
        const FILE_SIZE_LIMIT = FILE_SIZE_LIMIT_MB * 1024 * 1024;

        return value.size <= FILE_SIZE_LIMIT;
      },
    })
    .test({
      name: "fileType",
      message: "Tipo de arquivo não suportado.",
      test: (value: any) => {
        if (!value || !value.name) return false;
        return validateImageExtension(value.name);
      },
    }),
  education: Yup.string().required("Digite uma formação"),
  linkLattes: Yup.string().required(
    "Insira o link para o currículo Lattes do docente"
  ),
  type: Yup.string().required("Digite um tipo válido"),
});

interface FormikValues {
  name: string;
  image: File | null;
  education: string;
  linkLattes: string;
  type: string;
}

const CreateTeacher = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useTeacherContext();

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

  const handleCreate = async ({
    name,
    image,
    education,
    linkLattes,
    type,
  }: FormikValues) => {
    try {
      setLoading(true);

      const createBody = new FormData();
      createBody.append("name", name);
      createBody.append("education", education);
      createBody.append("linkLattes", linkLattes);
      createBody.append("type", type);

      if (image) {
        createBody.append("image", image);
      }

      const response = await api.post<CreateTeacherResponse>(
        "/teacher",
        createBody
      );

      const created = response.status === 201;

      if (created) {
        handleCloseModal();

        dispatch({
          type: "ADD_TEACHER",
          payload: response.data,
        });
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title="Cadastrar"
        children={
          <Formik
            initialValues={initialValues}
            onSubmit={handleCreate}
            validationSchema={schema}
          >
            {({ setFieldValue }) => (
              <Form className="flex grow flex-col justify-between">
                <>
                  <div className="">
                    <div className="flex">
                      <div className="mr-4 ">
                        <Field name="image">
                          {({ field, meta }: FieldProps) => (
                            <ImageUploadInput
                              label="Insira uma foto do docente:"
                              {...field}
                              error={meta.touched ? meta.error : ""}
                              value={field.value}
                              setFieldValue={setFieldValue}
                            />
                          )}
                        </Field>
                      </div>

                      <div className="flex-auto">
                        <Field name="name">
                          {({ field, meta }: FieldProps) => (
                            <TextInput
                              label="Nome completo do docente:"
                              {...field}
                              value={field.value}
                              error={meta.touched ? meta.error : ""}
                            />
                          )}
                        </Field>

                        <div className="mt-4">
                          <Field name="education">
                            {({ field, meta }: FieldProps) => (
                              <TextInput
                                label="Insira a formação do docente:"
                                {...field}
                                value={field.value}
                                error={meta.touched ? meta.error : ""}
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Field name="linkLattes">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Link para o currículo Lattes do docente:"
                            {...field}
                            value={field.value}
                            error={meta.touched ? meta.error : ""}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="mt-4">
                      <Field name="type">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <CustomSelect
                              label="Selecione o tipo do docente:"
                              options={["colegiado", "colaborador"].map(
                                (type) => {
                                  return { label: type, value: type };
                                }
                              )}
                              field={field}
                              error={meta.touched ? meta.error : ""}
                            />
                          </div>
                        )}
                      </Field>
                    </div>
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

                <div className="flex justify-end mt-8">
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

      <Button
        apperance="primary"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : "Criar"}
      </Button>
      {/* <div className="opacity-40 bg-black inset-0 fixed z-[1]"></div>

      <div className="absolute p-5 bg-white rounded-lg shadow-lg z-[1] max-w-xl w-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-xl">Cadastrar</div>
          <div className="cursor-pointer" onClick={() => setOpenModal(false)}>
            <FiX size={24} />
          </div>
        </div>
       
      </div> */}
    </>
  );
};

export { CreateTeacher };
