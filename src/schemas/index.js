import * as yup from "yup";

export const loginSchema = yup.object({
  // userName: yup
  //   .string()
  //   .matches(/^[a-zA-Z0-9_-]{3,16}$/, "Please choose another username")
  //   .min(6, "Username too short!")
  //   .max(12, "Username too long")
  //   .required("Username cannot be blank!"),,
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email")
    .email("Invalid email!")
    .required("Email cannot be blank!"),
  password: yup
    .string()
    // .matches(
    //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    // )
    .required("Password must include 5-12 characters"),
});

export const registerSchema = yup.object({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]{3,16}$/, "Please choose another username")
    .min(6, "Username too short!")
    .max(12, "Username too long")
    .required("Username cannot be blank!"),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email")
    .email("Invalid email!")
    .required("Email cannot be blank!"),
  password: yup
    .string()
    // .matches(
    //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    // )
    .required("Password must include 5-12 characters"),
  confirmPassword: yup
    .string()
    .test("password-match", "Passwords do not match!", function (value) {
      return value === this.parent.password;
    })

    .required("Field cannot be blank!"),
});
