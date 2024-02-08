import * as yup from "yup";

const validations = yup.object().shape({
  email: yup.string().email("Email is required").required("zorunlu alan"),
  password: yup
    .string()
    .min(6, "password is shortly")
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Password not correct")
    .required(),
});

export default validations;
