import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import IconEyeClosed from '../../assets/icons/btn/icon-eye-closed.svg';
import IconEyeOpen from '../../assets/icons/btn/icon-eye-open.svg';

import { authorizationUserAction, selectValidationErrorMessage } from '../../store/slices/loader-slice';

import { LinkAnotherAction } from '../../components/personal-cabinet/link-another-action/link-another-action';

import './authorization.css';

export const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationErrorMessage = useSelector(selectValidationErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: 'onBlur',
  });

  const [isOpenEye, setIsOpenEye] = useState(false);

  const onSubmit = async ({ identifier, password }) => {
    // TODO
    const resultAction = await dispatch(authorizationUserAction({ identifier, password }));

    if (authorizationUserAction.fulfilled.match(resultAction)) {
      navigate('/books/all');
    }
  };

  return (
    <div className="container-authorization" data-test-id="auth">
      <p className="authorization-title">Вход в личный кабинет</p>

      <form className="wrapper-authorization" onSubmit={handleSubmit(onSubmit)} data-test-id="auth-form">
        <div className="container-authorization-info">
          <label className="container-authorization-input">
            <input
              style={{
                borderBottom: `1px solid ${errors?.identifier || validationErrorMessage ? '#F42C4F' : '#bfc4c9'}`,
              }}
              className="authorization-input"
              placeholder="Логин"
              {...register('identifier', {
                required: 'Поле не может быть пустым',
              })}
              autoComplete="identifier"
            />

            <div className="authorization-input-error">
              {errors?.identifier?.message && <p data-test-id="hint">Поле не может быть пустым</p>}
            </div>
          </label>

          <label className="container-authorization-input">
            <input
              style={{
                borderBottom: `1px solid ${errors?.password || validationErrorMessage ? '#F42C4F' : '#bfc4c9'}`,
              }}
              className="authorization-input"
              placeholder="Пароль"
              {...register('password', {
                required: 'Поле не может быть пустым',
              })}
              type={isOpenEye ? 'text' : 'password'}
              autoComplete="current-password"
            />

            <div className="authorization-input-error">
              {errors?.password?.message && <p data-test-id="hint">Поле не может быть пустым</p>}
            </div>

            {dirtyFields?.password && (
              <button
                className="authorization-btn-visible-password"
                onClick={() => setIsOpenEye(!isOpenEye)}
                type="button"
              >
                <img
                  data-test-id={isOpenEye ? 'eye-opened' : 'eye-closed'}
                  src={isOpenEye ? IconEyeOpen : IconEyeClosed}
                  alt=""
                />
              </button>
            )}
          </label>
        </div>

        <div className="container-authorization-link-reset-password">
          <p className="authorization-authorization-error" data-test-id="hint">
            {validationErrorMessage && 'Неверный логин или пароль'}
          </p>
          <Link
            to="/forgot-pass"
            style={{ color: `${validationErrorMessage ? '#363636' : '#a7a7a7'}` }}
            className="authorization-link-reset-password"
          >
            {validationErrorMessage ? 'Восстановить?' : 'Забыли логин или пароль?'}
          </Link>
        </div>

        <button className="authorization-btn-log-in primary" type="submit">
          Вход
        </button>
      </form>

      <div className="container-authorization-action">
        <LinkAnotherAction textContent="Нет учётной записи?" action="/registration" linkText="Регистрация" />
      </div>
    </div>
  );
};
