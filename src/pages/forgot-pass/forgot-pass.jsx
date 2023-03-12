import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import IconBackArrow from '../../assets/icons/general/icon-back-arrow.svg';

import * as validation from '../../commons/validations';
import { ValidationCustomInput } from '../../components/personal-cabinet/validation-custom-input/validation-custom-input';
import { forgotPasswordUserAction, resetPasswordUserAction } from '../../store/slices/loader-slice';

import './forgot-pass.css';

export const ForgotPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();

  const [isBlured, setIsBlured] = useState(false);

  const code = search ? search.replace('?code=', '') : false;
  const passDescription = ['Пароль ', 'не менее 8 символов', ', ', 'с заглавной буквой', ' и ', 'цифрой'];

  const FormSchemaForgotPassword = yup
    .object()
    .shape({
      email: validation.emailValidation,
    })
    .required();

  const FormSchemaResetPassword = yup
    .object()
    .shape({
      password: validation.passwordValidation,
      passwordConfirmation: validation.passwordConfirmationValidation,
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'all',
    resolver: yupResolver(code ? FormSchemaResetPassword : FormSchemaForgotPassword),
  });

  const onSubmitForgotPassword = async (email) => {
    await dispatch(forgotPasswordUserAction(email));
  };

  const onSubmitResetPassword = async ({ password, passwordConfirmation }) => {
    await dispatch(resetPasswordUserAction({ password, passwordConfirmation, code }));
  };

  return (
    <React.Fragment>
      <div className="container-forgot-pass-btn-back">
        <button className="forgot-pass-btn-back" type="button" onClick={() => navigate('/auth')}>
          <img className="forgot-pass-icon-back" src={IconBackArrow} alt="" />

          <p className="forgot-pass-text">Вход в личный кабинет</p>
        </button>
      </div>

      <div className="container-forgot-pass wrapper-personal-cabinet">
        <p className="forgot-pass-title personal-cabinet-title">Восстановление пароля</p>

        {code ? (
          <form
            className="container-personal-cabinet-form"
            onSubmit={handleSubmit(onSubmitResetPassword)}
            noValidate={true}
            data-test-id="reset-password-form"
          >
            <div className="container-personal-cabinet-inputs">
              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <ValidationCustomInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    errors={errors}
                    input="password"
                    placeholder="Новый пароль"
                    description={passDescription}
                    additionalHint={true}
                    dirtyFields={dirtyFields}
                    isBlured={isBlured}
                    setIsBlured={setIsBlured}
                  />
                )}
              />

              <Controller
                name="passwordConfirmation"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <ValidationCustomInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    errors={errors}
                    input="passwordConfirmation"
                    placeholder="Повторите пароль"
                    additionalHint={false}
                    dirtyFields={dirtyFields}
                    isBlured={isBlured}
                    setIsBlured={setIsBlured}
                  />
                )}
              />
            </div>

            <button
              className={`personal-cabinet-form-btn personal-cabinet-form-btn ${isBlured ? 'primary' : 'disabled'}`}
              type="submit"
              disabled={!isBlured}
              onClick={() => {
                setIsBlured(false);
              }}
            >
              Сохранить изменения
            </button>
          </form>
        ) : (
          <form
            className="container-personal-cabinet-form"
            onSubmit={handleSubmit(onSubmitForgotPassword)}
            noValidate={true}
            data-test-id="send-email-form"
          >
            <div className="container-personal-cabinet-inputs">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <ValidationCustomInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    inputRef={ref}
                    errors={errors}
                    input="email"
                    placeholder="E-mail"
                    description="На это email  будет отправлено письмо с инструкциями по восстановлению пароля"
                    dirtyFields={dirtyFields}
                    isBlured={isBlured}
                    setIsBlured={setIsBlured}
                  />
                )}
              />
            </div>

            <button className="personal-cabinet-form-btn personal-cabinet-form-btn primary" type="submit">
              Восстановить
            </button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};
