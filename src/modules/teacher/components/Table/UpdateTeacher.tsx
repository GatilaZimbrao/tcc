import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { api } from "../../../../shared/clients/APIClient";
import { Teacher, UpdateTeacherResponse } from "../../typings/teacher";
import { Spinner } from "../../../../shared/styleguide/Spinner/Spinner";
import { useTeacherContext } from "../../context/TeacherProvider";
import Modal from "../../../../shared/styleguide/Modal/Modal";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../../shared/styleguide/Inputs/TextInput/TextInput";
import { CustomSelect } from "../../../../shared/styleguide/Inputs/CustomSelect/CustomSelect";
import { ErrorMessage } from "../../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../../shared/styleguide/Button/Button";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { ImageUploadInput } from "../../../../shared/styleguide/Inputs/ImageUploadInput/ImageUploadInput";
import { validateImageExtension } from "../../../../shared/utils/validateImageExtension";

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  image: Yup.mixed()
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
          return validateImageExtension(value.name);
        }

        return true;
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
  image: File | string | null;
  education: string;
  linkLattes: string;
  type: string;
}

interface UpdateTeacherProps {
  teacher: Teacher;
}

const UpdateTeacher = ({ teacher }: UpdateTeacherProps) => {
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

  const handleUpdate = async ({
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
        if (typeof image == "object") {
          createBody.append("image", image);
        } else {
          createBody.append("image", new File([], teacher.image));
        }
      }

      const response = await api.put<UpdateTeacherResponse>(
        `/teacher/${teacher.id}`,
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
    name: teacher.name,
    image: teacher.image,
    education: teacher.education,
    linkLattes: teacher.linkLattes,
    type: teacher.type,
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
                    <div className="flex">
                      <div className="mr-4 ">
                        <Field name="image">
                          {({ field, meta }: FieldProps) => (
                            <ImageUploadInput
                              label="Insira uma foto do docente:"
                              {...field}
                              initialValue={initialValues.image}
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
                              initialValue={initialValues.type}
                              options={["colegiado", "colaborador"].map(
                                (type) => {
                                  return { label: type, value: type };
                                }
                              )}
                              field={field}
                              error={meta.error}
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
      <button
        className="p-4 shadow-md bg-gray-50 cursor-pointer rounded"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : <FiEdit />}
      </button>
    </>
  );
};

export { UpdateTeacher };
