import * as Yup from "yup";
const editUserValidationSchema = Yup.object({
  name: Yup.string()
    .min(4, "Name must be minimum 4 character")
    .required("This field is required"),
  // city: Yup.string()
  //   .min(4, "City must be minimum 4 character")
  //   .required("This field is required"),
  // age: Yup.number()
  //   .typeError("Please enter valid age")
  //   .positive("Please enter valid age")
  //   .min(1, "Please enter valid age")
  //   .max(150, "Please enter valid age")
  //   .required("This field is required"),
  // pinCode: Yup.string()
  //   .min(6, "PIN code must be 6 digits")
  //   .required("This field is required"),
});
export default editUserValidationSchema;
