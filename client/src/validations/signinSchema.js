import * as Yup from "yup";

export const signinSchema = Yup.object().shape({
  email: Yup.string().required("Required field").email("Invalid email"),
  password: Yup.string()
    .required("Required field")
    .min(3, "Must be atleast 3 characters")
    .max(8, "Must be smaller than 9 characters"),
});
