// eslint-disable-next-line max-len
import * as yup from 'yup';

export const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailValidation = yup
  .string()
  .trim()
  .matches(emailRegEx, 'Enter a valid email address')
  .required('Enter a valid email address');

export const passwordValidation = yup
  .string()
  // TODO  regEx .matches( , 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
  .min(8, 'Enter at least 8 characters')
  .max(50, 'Maximum password length is 50 characters')
  .required('Enter a valid password');

export const confirmPasswordValidation = yup
  .string()
  .min(8, 'Enter at least 8 characters')
  .max(50, 'Maximum password length is 50 characters')
  .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
  .required('Enter a valid password');
