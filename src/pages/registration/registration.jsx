import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LinkAnotherAction } from '../../components/personal-cabinet/link-another-action/link-another-action';
import * as validation from '../../commons/validations';

import { ValidationInput } from '../../components/personal-cabinet/validation-input/validation-input';

import './registration.css';

export const Registration = () => {
  const [stepRegistration, setStepRegistration] = useState(1);
  const [isOpenEye, setIsOpenEye] = useState(false);

  const FormSchema = yup
    .object()
    .shape({
      email: validation.emailValidation,
      password: validation.passwordValidation,
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(FormSchema),
  });

  return (
    <div className="container-registration">
      <div className="container-registration-title">
        <p className="registration-title">Регистрация</p>

        <p className="registration-steps">{`${stepRegistration} шаг из 3`}</p>
      </div>

      <form className="wrapper-registration" onSubmit={handleSubmit()}>
        <div>
          <label className="container-registration-input">
            <input
              style={{
                borderBottom: `1px solid ${errors?.identifier ? '#F42C4F' : '#bfc4c9'}`,
              }}
              className="registration-input"
              placeholder="Придумайте логин для входа"
              {...register('identifier', {
                required: 'Поле не может быть пустым',
              })}
              autoComplete="identifier"
            />
            <div className="registration-input-error">
              {errors?.identifier?.message ? (
                <p>Поле не может быть пустым</p>
              ) : (
                <p>Используйте для логина латинский алфавит и цифры</p>
              )}
            </div>
          </label>

          <label className="container-registration-input">
            <input
              style={{
                borderBottom: `1px solid ${errors?.identifier ? '#F42C4F' : '#bfc4c9'}`,
              }}
              className="registration-input"
              placeholder="Пароль"
              {...register('identifier', {
                required: 'Поле не может быть пустым',
              })}
              type="password"
              autoComplete="identifier"
            />
            <div className="registration-input-error">
              {errors?.identifier?.message ? (
                <p>Поле не может быть пустым</p>
              ) : (
                <p>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
              )}
            </div>
          </label>
        </div>

        <button
          className="registration-btn primary"
          type="button"
          onClick={() => setStepRegistration(stepRegistration + 1)}
          disabled={isValid}
        >
          Следующий шаг
        </button>
      </form>

      <div className="container-authorization-action">
        <LinkAnotherAction textContent="Есть учётной записи?" action="/auth" linkText="Войти" />
      </div>
    </div>
  );
};
