import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Required field"),
  email: Yup.string().required("Required field").email("Invalid email"),
  password: Yup.string()
    .required("Required field")
    .min(3, "Must be atleast 3 characters")
    .max(8, "Must be smaller than 9 characters"),
  confirmPassword: Yup.string()
    .required("Required field")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
