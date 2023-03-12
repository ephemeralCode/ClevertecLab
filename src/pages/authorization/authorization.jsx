import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import * as validation from '../../commons/validations';

import {
  authorizationUserAction,
  selectValidationErrorMessage,
  toggleValidationErrorMessage,
} from '../../store/slices/loader-slice';

import { LinkAnotherAction } from '../../components/personal-cabinet/link-another-action/link-another-action';
import { ValidationCustomInput } from '../../components/personal-cabinet/validation-custom-input/validation-custom-input';

import './authorization.css';

export const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationErrorMessage = useSelector(selectValidationErrorMessage);

  const [isBlured, setIsBlured] = useState(false);

  const FormSchema = yup
    .object()
    .shape({
      identifier: validation.authUsernameValidation,
      password: validation.authPasswordValidation,
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'all',

    resolver: yupResolver(FormSchema),
  });

  const onSubmit = async ({ identifier, password }) => {
    // TODO useEffect
    const resultAction = await dispatch(authorizationUserAction({ identifier, password }));

    if (authorizationUserAction.fulfilled.match(resultAction)) {
      navigate('/books/all');
    }
  };

  return (
    <div className="container-authorization wrapper-personal-cabinet">
      <p className="authorization-title personal-cabinet-title">Вход в личный кабинет</p>

      <form
        className="wrapper-authorization container-personal-cabinet-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate="novalidate"
        data-test-id="auth-form"
      >
        <div className="container-authorization-inputs container-personal-cabinet-inputs">
          <Controller
            name="identifier"
            control={control}
            additionalHint={false}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ValidationCustomInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                errors={errors}
                input="identifier"
                placeholder="Логин"
                additionalHint={false}
                dirtyFields={dirtyFields}
                isBlured={isBlured}
                setIsBlured={setIsBlured}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            additionalHint={false}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ValidationCustomInput
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                errors={errors}
                input="password"
                placeholder="Пароль"
                additionalHint={false}
                dirtyFields={dirtyFields}
                isBlured={isBlured}
                setIsBlured={setIsBlured}
              />
            )}
          />
        </div>

        <div className="container-authorization-link-reset-password">
          <p className="authorization-text-error" data-test-id="hint">
            {validationErrorMessage && 'Неверный логин или пароль!'}
          </p>

          <Link
            to="/forgot-pass"
            className={`authorization-link-reset-password ${validationErrorMessage ? 'active' : ''}`}
            onClick={() => dispatch(toggleValidationErrorMessage(false))}
          >
            {validationErrorMessage ? 'Восстановить?' : 'Забыли логин или пароль?'}
          </Link>
        </div>

        <button className="authorization-btn-log-in personal-cabinet-form-btn primary" type="submit">
          Вход
        </button>
      </form>

      <div className="container-authorization-action">
        <LinkAnotherAction textContent="Нет учётной записи?" action="/registration" linkText="Регистрация" />
      </div>
    </div>
  );
};
