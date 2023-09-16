import * as yup from 'yup'
import {calculateBase64Size} from './code'

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
      return value.size < 2 * 1024 * 1024 // 500kb
    })
})



const imageSchema = yup.string().test({
  name: 'maxSize',
  test: function (value) {
    const maxSizeBytes = 5 * 1024 * 1024; //500kb*2 = 1mb
    const sizeInBytes = calculateBase64Size(value);
    return sizeInBytes <= maxSizeBytes;
  },
  message: 'image size too large',
});

export const ImageUploadValidation = yup.array().of(imageSchema);


export const EditProfileValidation = yup.object().shape({
  
  fullname: yup
    .string()
    .required('Name is required')
    .matches(/^(?=.{4,18}$)[a-zA-Z]+ [a-zA-Z]+$/, 'name must contain two words of alphabits'),
  bio: yup
    .string()
    .max(250, 'Max length of bio is 250 charecter'),
  slogan: yup
    .string()
    .max(20, 'Max length of slogan is 20 charecter')
    
})

export const ChangePassValidation = yup.object().shape({
  oldpass: yup
    .string()
    .required("Please enter a your current password")
    .min(8, "This password is not valid"),
  newpass: yup
    .string()
    .required("Please enter a new password")
    .min(8, "Password must have at least 8 characters")
  
})