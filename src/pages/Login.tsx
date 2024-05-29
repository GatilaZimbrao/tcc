import { Formik, Form, Field, FieldProps } from "formik";

import * as Yup from "yup";
import { TextInput } from "../shared/styleguide/Inputs/TextInput/TextInput";
import { Button } from "../shared/styleguide/Button/Button";
import { BoxedPage } from "../shared/styleguide/BoxedPage/BoxedPage";
import { useAuth } from "../modules/auth/context/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../shared/styleguide/Inputs/ErrorMessage/ErrorMessage";
import { Link, Navigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

type FormikValues = typeof initialValues;

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Digite um email válido"),
  password: Yup.string().required("Digite uma senha válida"),
});

export const Login = () => {
  const { handleLogin, loading, isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const [requestError, setRequestError] = useState<string | undefined>("");

  useEffect(() => {
    if (requestError) {
      setTimeout(() => {
        setRequestError("");
      }, 2000);
    }
  }, [requestError]);

  const onSubmit = async ({ email, password }: FormikValues) => {
    const { success, message, error } = await handleLogin({
      email,
      password,
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
    }
  };

  const content = (
    <>
      <div className="mt-6">
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
      </div>

      {requestError && (
        <div className="mt-2">
          <ErrorMessage error={requestError} />
        </div>
      )}
    </>
  );

  const footer = (
    <>
      <Button compact apperance="link" size="sm">
        <Link to="/register" className="text-link">
          Registre-se
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
            title="Faça login para ter acesso"
            children={content}
            footer={footer}
          />
        </Form>
      )}
    </Formik>
  );
};
