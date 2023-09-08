import * as yup from 'yup'

export const SignInValidation =  yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid gmail provided')
    .required('Email is required'),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters"),
  
})

export const SignUpValidation = yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid gmail provided')
    .required('Email is required'),
  fullname: yup
    .string()
    .required('Name is required')
    .matches(/^(?=.{4,18}$)[a-zA-Z]+ [a-zA-Z]+$/, 'name must contain two words of alphabits'),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters"),
  image: yup
    .mixed()
    .test("is-exist", "Profile image is required", (value) => {
      return value.size > 0 
    }).test("isnot-big", "This image is too big", (value) => {
      return value.size < 500000  // 500kb
    })
})