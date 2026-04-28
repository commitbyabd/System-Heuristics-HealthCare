import * as Yup from "yup";

export const contactFormInitialValues = {
  fullName: "",
  email: "",
  organizationType: "",
  interest: "",
  message: "",
};

export const contactFormValidationSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  organizationType: Yup.string().required("Please select an organization type"),
  interest: Yup.string().required("Please select what you're looking for"),
  message: Yup.string()
    .trim()
    .min(14, "Message must be at least 14 characters")
    .required("Message is required"),
});
