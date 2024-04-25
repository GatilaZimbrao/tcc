import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

import * as Yup from "yup";
import { Contact, UpdateContactResponse } from "../typings/contact";
import { useContactContext } from "../context/ContactProvider";
import { api } from "../../../shared/clients/APIClient";
import Modal from "../../../shared/styleguide/Modal/Modal";
import { Field, FieldProps, Form, Formik } from "formik";
import { TextInput } from "../../../shared/styleguide/Inputs/TextInput/TextInput";
import { ErrorMessage } from "../../../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../../../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Button } from "../../../shared/styleguide/Button/Button";
import { Spinner } from "../../../shared/styleguide/Spinner/Spinner";
import { AxiosError } from "axios";

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  email: Yup.string().email().required("Digite um email válido"),
  tel: Yup.string().required("Digite uma telefone válido"),
});

interface FormikValues {
  name: string;
  email: string;
  tel: string;
}

interface UpdateContactProps {
  contact: Contact;
}

const UpdateContact = ({ contact }: UpdateContactProps) => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContactContext();

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

  const handleUpdate = async ({ name, email, tel }: FormikValues) => {
    try {
      setLoading(true);

      const data = {
        name,
        email,
        tel,
      };

      const response = await api.put<UpdateContactResponse>(
        `/contact/${contact.id}`,
        data
      );

      const updated = response.status === 200;

      if (updated) {
        handleCloseModal();

        location.reload();
        // dispatch({
        //   type: "ADD_CONTACT",
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
    name: contact.name,
    email: contact.email,
    tel: contact.tel,
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
                          label="Nome para contato:"
                          {...field}
                          value={field.value}
                          error={meta.touched ? meta.error : ""}
                        />
                      )}
                    </Field>
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
                      <Field name="tel">
                        {({ field, meta }: FieldProps) => (
                          <TextInput
                            label="Telefone para contato:"
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
        className="p-2 shadow-md bg-gray-50 cursor-pointer rounded"
        onClick={loading ? () => {} : handleOpenModal}
      >
        {loading ? <Spinner /> : <FiEdit size={16} />}
      </button>
    </>
  );
};

export { UpdateContact };
