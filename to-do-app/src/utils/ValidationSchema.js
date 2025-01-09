import * as Yup from "yup";

const ValidationSchema = Yup.object({
  email: Yup.string().email().required("Email is required").nullable(true),
  password: Yup.string().required("Password is required"),
  reEnterPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
export default ValidationSchema;
