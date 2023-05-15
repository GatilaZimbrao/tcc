import axios from "axios";
import { Formik, Form, Field } from "formik";
import { FormikHelpers } from "formik/dist/types";

import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

type FormikValues = typeof initialValues;

const schema = Yup.object().shape({
  email: Yup.string().email().required("Digite um email válido"),
  password: Yup.string().required("Digite uma senha válida"),
});

function Login() {
  const onSubmit = async (
    { email, password }: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => {
    formikHelpers.setErrors({
      email: "AAAAA",
      password: "BBBBBBB",
    });

    const result = axios.get("http://localhost:5000/user", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log("ENVIAR", result);
  };
  return (
    <div className="flex min-h-screen w-full p-10 items-center justify-center">
      <div className="rounded-lg bg-gray-500 p-4">
        <h1 className="text-3xl">Login</h1>

        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({ errors, touched }) => (
              <Form>
                <Field type="email" name="email" placeholder="Email">
                  {/* <input type="text" /> */}
                </Field>
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}

                <Field name="password" placeholder="Digite sua senha">
                  {/* <input type="text" placeholder="OI" /> */}
                </Field>
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
                <button type="submit">Entrar</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
