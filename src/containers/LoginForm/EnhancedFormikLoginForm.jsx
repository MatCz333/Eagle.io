import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import LoginForm from "./LoginForm";

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("").required("Enter your password")
});
const initialValues = { email: "", password: "" };

const EnhancedFormikLoginForm = () => (
  <Formik
    render={props => <LoginForm {...props} />}
    initialValues={initialValues}
    validationSchema={validationSchema}
  />
);

export default EnhancedFormikLoginForm;
