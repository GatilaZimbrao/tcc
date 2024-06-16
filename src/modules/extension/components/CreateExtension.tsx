import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import * as Yup from "yup";
import { Extension, CreateExtensionResponse } from "../typings/extension";
import { useExtensionContext } from "../context/ExtensionProvider";
import { api } from "../../../shared/clients/APIClient";
import Modal from "../../../shared/styleguide/Modal/Modal";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../shared/styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../shared/styleguide/Button/Button";
import { Spinner } from "../../../shared/styleguide/Spinner/Spinner";
import { CustomSelect } from "../../../shared/styleguide/Inputs/CustomSelect/CustomSelect";
import { ExtensionTypes } from "../typings/extensionTypes";
import { Teacher } from "../../teacher/typings/teacher";
import { AxiosError } from "axios";
import { MultiSelect } from "../../../shared/styleguide/Inputs/MultiSelect/MultiSelect";
import { TextAreaInput } from "../../../shared/styleguide/Inputs/TextAreaInput/TextAreaInput";

const initialValues = {
  name: "",
  abstract: "",
  email: "",
  isActive: true,
  site: "",
  teachers: [],
};

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  abstract: Yup.string().required("Digite uma resumo válido"),
  email: Yup.string()
    .email("Digite um email válido")
    .required("Digite um email válido"),
  isActive: Yup.bool().required("Selecione um estado"),
  site: Yup.string(),
  teachers: Yup.array()
    .of(Yup.number())
    .min(1, "Selecione pelo menos um docente.")
    .max(2, "Selecione até 2 docentes.")
    .required("Selecione pelo menos um docente"),
});

interface FormikValues {
  name: string;
  abstract: string;
  email: string;
  isActive: boolean;
  site: string;
  teachers: number[];
}

interface CreateExtensionProps {
  type: ExtensionTypes;
}

const CreateExtension = ({ type }: CreateExtensionProps) => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const { dispatch } = useExtensionContext();

  const [requestError, setRequestError] = useState<string | undefined>("");
  const [requestSuccess, setRequestSuccess] = useState<string | undefined>("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teacher");
        if (response.status === 200) {
          setTeachers(response.data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

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
    abstract,
    email,
    isActive,
    site,
    teachers,
  }: FormikValues) => {
    try {
      setLoading(true);

      const data = {
        name,
        abstract,
        email,
        isActive,
        site,
        type: type,
        teachers,
      };

      const response = await api.post<CreateExtensionResponse>(
        `/extension`,
        data
      );

      const created = response.status === 201;

      if (created) {
        handleCloseModal();

        dispatch({
          type: "ADD_EXTENSION",
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
            {({}) => (
              <Form className="flex grow flex-col justify-between">
                <>
                  <div className="">
                    <Field name="name">
                      {({ field, meta }: FieldProps) => (
                        <TextInput
                          label="Nome do programa:"
                          {...field}
                          value={field.value}
                          error={meta.touched ? meta.error : ""}
                        />
                      )}
                    </Field>

                    <div className="mt-4">
                      <Field name="abstract">
                        {({ field, meta }: FieldProps) => (
                          // <TextInput
                          //   label="Resumo do programa:"
                          //   {...field}
                          //   value={field.value}
                          //   error={meta.touched ? meta.error : ""}
                          // />
                          <TextAreaInput
                            label="Resumo do programa:"
                            error={meta.touched ? meta.error : ""}
                            // value={field.value}

                            {...field}
                            compact={true}
                            block={true}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field name="email">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Email para contato:"
                            {...field}
                            value={field.value}
                            error={meta.touched ? meta.error : ""}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field name="isActive">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <CustomSelect
                              label="Está ativo?"
                              options={[
                                {
                                  value: true,
                                  label: "Sim",
                                },
                                {
                                  value: false,
                                  label: "Não",
                                },
                              ].map((item) => {
                                return {
                                  value: item.value,
                                  label: item.label,
                                };
                              })}
                              initialValue={"Sim"}
                              field={field}
                              error={meta.touched ? meta.error : ""}
                            />
                          </div>
                        )}
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field name="site">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Url do programa, se existir"
                            {...field}
                            value={field.value}
                            error={meta.touched ? meta.error : ""}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field name="teachers">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <MultiSelect
                              label="Selecione o docente do programa:"
                              options={teachers.map((teacher) => {
                                return {
                                  value: teacher.id,
                                  label: teacher.name,
                                };
                              })}
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
    </>
  );
};

export { CreateExtension };
