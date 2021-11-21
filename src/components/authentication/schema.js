import * as yup from "yup"

export const signUpSchema = yup.object().shape({
  name: yup.string().min(1).required("Please enter a full name"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  email: yup
    .string()
    .email()
    .required("Please enter a email")
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
  user_name: yup.string().min(1).required("Please enter a username"),
})

export const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Please enter a email")
    .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
})
