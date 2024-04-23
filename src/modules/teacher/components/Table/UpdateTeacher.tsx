import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { api } from "../../../../shared/clients/APIClient";
import {
  Teacher,
  GetTeacherResponse,
  ListTeacherResponse,
  UpdateTeacherResponse,
} from "../../typings/teacher";
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

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  image: Yup.string().required("Insira o link para a foto"),
  education: Yup.string().required("Digite uma formação"),
  linkLattes: Yup.string().required(
    "Insira o link para o currículo Lattes do docente"
  ),
  type: Yup.string().required("Digite um tipo válido"),
});

interface FormikValues {
  name: string;
  image: string;
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

      const data = {
        name,
        image,
        education,
        linkLattes,
        type,
      };

      const response = await api.put<UpdateTeacherResponse>(
        `/teacher/${teacher.id}`,
        data
      );

      const updated = response.status === 200;

      if (updated) {
        handleCloseModal();

        location.reload();

        // dispatch({
        //   type: "ADD_TEACHER",
        //   payload: response.data,
        // });
      }
    } catch (error) {
      console.error(error);
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
            {({}) => (
              <Form className="flex grow flex-col justify-between">
                <>
                  <div className="">
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
                      <Field name="image">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Insira o link para uma foto do docente:"
                            {...field}
                            value={field.value}
                            error={meta.touched ? meta.error : ""}
                          />
                        )}
                      </Field>
                    </div>
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
                    </div>{" "}
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
                            {meta.touched && meta.error && (
                              <div className="text-red-500 text-sm">
                                {meta.error}
                              </div>
                            )}
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
