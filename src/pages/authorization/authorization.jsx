import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import IconLinkArrow from '../../assets/icons/btn/icon-link-arrow.svg';

import { authorizationUserAction, selectValidationErrorMessage } from '../../store/slices/loader-slice';

import './authorization.css';

export const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationErrorMessage = useSelector(selectValidationErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async ({ identifier, password }) => {
    const resultAction = await dispatch(authorizationUserAction({ identifier, password }));

    if (authorizationUserAction.fulfilled.match(resultAction)) {
      navigate('/books/all');
    }
  };

  return (
    <div className="container-personal-cabinet">
      <form className="wrapper-personal-cabinet" onSubmit={handleSubmit(onSubmit)}>
        <p className="personal-cabinet-title">Вход в личный кабинет</p>

        <div className="container-personal-cabinet-info">
          <label className="container-personal-cabinet-input">
            {/* Логин: */}
            <input
              style={{
                borderBottom: `1px solid ${errors?.identifier || validationErrorMessage ? '#F42C4F' : '#bfc4c9'}`,
              }}
              className="personal-cabinet-input"
              placeholder="Логин"
              {...register('identifier', {
                required: 'Поле не может быть пустым',
              })}
              autoComplete="identifier"
            />
            <div className="personal-cabinet-input-error">
              {errors?.identifier?.message && <p>Поле не может быть пустым</p>}
            </div>
          </label>

          <label className="container-personal-cabinet-input">
            {/* Пароль: */}
            <input
              style={{
                borderBottom: `1px solid ${errors?.password || validationErrorMessage ? '#F42C4F' : '#bfc4c9'}`,
              }}
              className="personal-cabinet-input"
              placeholder="Пароль"
              {...register('password', {
                required: 'Поле не может быть пустым',
              })}
              type="password"
              autoComplete="current-password"
            />
            <div className="personal-cabinet-input-error">
              {errors?.password?.message && <p>Поле не может быть пустым</p>}
            </div>
          </label>
        </div>

        <div className="container-personal-cabinet-link-reset-password">
          <p className="personal-cabinet-authorization-error">
            {validationErrorMessage && 'Неверный логин или пароль'}
          </p>
          <Link
            to="/"
            style={{ color: `${validationErrorMessage ? '#363636' : '#a7a7a7'}` }}
            className="personal-cabinet-link-reset-password"
          >
            {validationErrorMessage ? 'Восстановить?' : 'Забыли логин или пароль?'}
          </Link>
        </div>

        <button className="personal-cabinet-btn-log-in primary" type="submit">
          Вход
        </button>
      </form>

      <div className="container-personal-cabinet-registration">
        <p className="personal-cabinet-registration-text">Нет учётной записи?</p>

        <Link to="/" className="wrapper-personal-cabinet-link-registration">
          <p className="personal-cabinet-link-registration-text">Регистрация</p>

          <img className="personal-cabinet-link-registration-icon" src={IconLinkArrow} alt="" />
        </Link>
      </div>
    </div>
  );
};
