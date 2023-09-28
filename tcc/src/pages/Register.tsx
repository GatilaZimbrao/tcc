import { Formik, Form, Field, FieldProps } from "formik";
import { FormikHelpers } from "formik/dist/types";

import * as Yup from "yup";
import { TextInput } from "../shared/styleguide/Inputs/TextInput/TextInput";
import { Button } from "../shared/styleguide/Button/Button";
import { BoxedPage } from "../shared/styleguide/BoxedPage/BoxedPage";
import { useAuth } from "../modules/auth/context/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "../shared/styleguide/Inputs/SuccessMessage/SuccessMessage";
import { Link } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

type FormikValues = typeof initialValues;

const schema = Yup.object().shape({
  name: Yup.string().required("Digite uma nome válido"),
  email: Yup.string().email().required("Digite um email válido"),
  password: Yup.string().required("Digite uma senha válida"),
  confirmPassword: Yup.string().required("Digite uma senha válida"),
});

export const Register = () => {
  const { handleRegister, loading } = useAuth();
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

  const onSubmit = async (
    { name, email, password, confirmPassword }: FormikValues,
    { setErrors }: FormikHelpers<FormikValues>
  ) => {
    if (password != confirmPassword) {
      setErrors({
        password: "Senhas devem ser iguais",
        confirmPassword: "Senhas devem ser iguais",
      });
      return;
    }
    const { success, message, error } = await handleRegister({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!success) {
      if (error === "ERR_BAD_REQUEST") {
        if (message) {
          setRequestError(message);
        } else {
          setRequestError("Ocorreu um erro, tente novamente");
        }
      } else if (error === "ERR_NETWORK") {
        setRequestError("Erro de conexão");
      }
    } else {
      if (message) {
        setRequestSuccess(message);
      } else {
        setRequestSuccess("Cadastrado com sucesso!");
      }
    }
  };

  const content = (
    <>
      <div className="mt-6">
        <Field name="name">
          {({ field, meta }: FieldProps) => (
            <TextInput
              label="Digite seu nome:"
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
                label="Digite seu email:"
                {...field}
                value={field.value}
                error={meta.touched ? meta.error : ""}
              />
            )}
          </Field>
        </div>
        <div className="mt-4">
          <Field name="password">
            {({ field, meta }: FieldProps) => (
              <TextInput
                type="password"
                label="Digite sua senha:"
                {...field}
                value={field.value}
                error={meta.touched ? meta.error : ""}
              />
            )}
          </Field>
        </div>
        <div className="mt-4">
          <Field name="confirmPassword">
            {({ field, meta }: FieldProps) => (
              <TextInput
                type="password"
                label="Repita sua senha:"
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
  );

  const footer = (
    <>
      <Button compact apperance="link" size="sm">
        <Link to="/login" className="text-link">
          Fazer login
        </Link>
      </Button>
      <Button loading={loading} apperance="primary" size="sm" type="submit">
        <span className="font-semibold">ENVIAR</span>
      </Button>
    </>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({}) => (
        <Form className="flex grow flex-col justify-between">
          <BoxedPage
            title="Cadastre-se para ter acesso"
            children={content}
            footer={footer}
          />
        </Form>
      )}
    </Formik>
  );
};
