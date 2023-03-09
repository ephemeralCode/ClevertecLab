import { useState } from 'react';
import * as yup from 'yup';

import { LinkAnotherAction } from '../../components/personal-cabinet/link-another-action/link-another-action';
import * as validation from '../../commons/validations';

import { RegistrationForm } from '../../components/personal-cabinet/registration-form/registration-form';

import './registration.css';

export const Registration = () => {
  const [stepRegistration, setStepRegistration] = useState(1);
  const [userDataForm, setUserDataForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  console.log(userDataForm);

  const FormSchemaStepOne = yup
    .object()
    .shape({
      username: validation.usernameValidation,
      password: validation.passwordValidation,
    })
    .required();

  const FormSchemaStepTwo = yup
    .object()
    .shape({
      firstName: validation.firstnameValidation,
      lastName: validation.lastnameValidation,
    })
    .required();

  const FormSchemaStepThree = yup
    .object()
    .shape({
      phone: validation.phoneValidation,
      email: validation.emailValidation,
    })
    .required();

  return (
    <div className="container-registration">
      <div className="container-registration-title">
        <p className="registration-title">Регистрация</p>

        <p className="registration-steps">{`${stepRegistration} шаг из 3`}</p>
      </div>

      {stepRegistration === 1 && (
        <RegistrationForm
          formSchema={FormSchemaStepOne}
          inputs={['username', 'password']}
          placeholders={['Придумайте логин для входа', 'Пароль']}
          descriptions={[
            'Используйте для логина латинский алфавит и цифры',
            'Пароль не менее 8 символов, с заглавной буквой и цифрой',
          ]}
          stepRegistration={stepRegistration}
          setStepRegistration={setStepRegistration}
          userDataForm={userDataForm}
          setUserDataForm={setUserDataForm}
        />
      )}

      {stepRegistration === 2 && (
        <RegistrationForm
          formSchema={FormSchemaStepTwo}
          inputs={['firstName', 'lastName']}
          placeholders={['Имя', 'Фамилия']}
          descriptions={['', '']}
          stepRegistration={stepRegistration}
          setStepRegistration={setStepRegistration}
          userDataForm={userDataForm}
          setUserDataForm={setUserDataForm}
        />
      )}

      {stepRegistration === 3 && (
        <RegistrationForm
          formSchema={FormSchemaStepThree}
          inputs={['phone', 'email']}
          placeholders={['Номер телефона', 'E-mail']}
          descriptions={['В формате +375 (xx) xxx-xx-xx', '']}
          stepRegistration={stepRegistration}
          setStepRegistration={setStepRegistration}
          userDataForm={userDataForm}
          setUserDataForm={setUserDataForm}
          maskPhone={validation.maskPhone}
        />
      )}

      <div className="container-authorization-action">
        <LinkAnotherAction textContent="Есть учётной запись?" action="/auth" linkText="Войти" />
      </div>
    </div>
  );
};
