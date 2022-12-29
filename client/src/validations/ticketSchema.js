import * as Yup from "yup";

export const ticketSchema = Yup.object().shape({
  title: Yup.string().required("Required field"),
  description: Yup.string().required("Required field"),
  priority: Yup.string().required("Required field"),
  assignee: Yup.string().required("Required field"),
});
