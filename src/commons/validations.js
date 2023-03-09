import * as yup from 'yup';

export const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmpty = 'Поле не может быть пустым';

export const usernameValidation = yup
  .string()
  .required(isEmpty)
  .matches(/^[a-zA-Z0-9]+$/, 'латинский алфавит')
  .matches(/(?=.*[0-9])/, 'цифры');

export const passwordValidation = yup
  .string()
  .required(isEmpty)
  .matches(/^.*(?=.{8,})/, 'не менее 8 символов')
  .matches(/(?=.*[А-ЯA-Z])/, 'с заглавной буквой')
  .matches(/(?=.*[0-9])/, 'цифрой');

export const confirmPasswordValidation = yup
  .string()
  .required(isEmpty)
  .matches(/^.*(?=.{8,})/, 'не менее 8 символов')
  .matches(/(?=.*[A-Z])/, 'с заглавной буквой')
  .matches(/(?=.*[0-9])/, 'цифрой')
  .oneOf([yup.ref('password'), null], 'Пароли не совпадают');

export const phoneValidation = yup
  .string()
  .required(isEmpty)
  .matches(/^\+375\s*\(?(29|33|25|44){1}\)?/g, 'Проверьте код оператора')
  .matches(/^\+375\s*\(\d{2}\)\s*[-]?\s*\d{3}\s*[-]?\s*\d{2}\s*[-]?\s*\d{2}$/g, 'В формате +375 (xx) xxx-xx-xx');

export const firstnameValidation = yup.string().required(isEmpty);

export const lastnameValidation = yup.string().required(isEmpty);

export const emailValidation = yup.string().trim().required(isEmpty).matches(emailRegEx, 'Введите корректный e-mail');

export const maskPhone = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];
