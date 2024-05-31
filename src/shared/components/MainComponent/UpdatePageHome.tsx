import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import { Field, FieldProps, Form, Formik } from "formik";

import * as Yup from "yup";
import { AxiosError } from "axios";
import { api } from "../../clients/APIClient";
import { Page, UpdatePageResponse } from "../../../modules/page/typings/page";
import { usePageContext } from "../../../modules/page/context/PageProvider";
import Modal from "../../styleguide/Modal/Modal";
import { TextInput } from "../../styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../styleguide/Button/Button";
import { Spinner } from "../../styleguide/Spinner/Spinner";

const schema = Yup.object().shape({
  pathName: Yup.string().required("Digite uma título válido"),
  title: Yup.string().required("Digite uma título válido"),
  description: Yup.string(),
  imageUrl: Yup.string(),
});
interface FormikValues {
  pathName: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface UpdatePageHomeProps {
  page: Page;
}

const UpdatePageHome = ({ page }: UpdatePageHomeProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = usePageContext();

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
    pathName,
    title,
    description,
    imageUrl,
  }: FormikValues) => {
    try {
      setLoading(true);

      const data = {
        pathName,
        title,
        description,
        additionalParams: {
          imageUrl,
        },
      };

      const response = await api.put<UpdatePageResponse>(
        `/page/${page.id}`,
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
    pathName: page.pathName,
    title: page.title,
    description: page.description,
    imageUrl: page?.additionalParams?.imageUrl ?? "",
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
                    <Field name="title">
                      {({ field, meta }: FieldProps) => (
                        <TextInput
                          label="Título da página:"
                          {...field}
                          value={field.value}
                          error={meta.touched ? meta.error : ""}
                        />
                      )}
                    </Field>
                    <div className="mt-4">
                      <Field name="description">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Descrição da página:"
                            {...field}
                            value={field.value}
                            error={meta.touched ? meta.error : ""}
                          />
                        )}
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field name="imageUrl">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Link da imagem:"
                            {...field}
                            value={field.value}
                            error={meta.touched ? meta.error : ""}
                          />
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

export { UpdatePageHome };
