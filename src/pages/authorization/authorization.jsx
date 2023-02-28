import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { urlAPI } from '../../api/api';

import IconLinkArrow from '../../assets/icons/btn/icon-link-arrow.svg';

import './authorization.css';

export const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    // resolver: yupResolver(FormSchema),
  });

  const onSubmit = ({ identifier, password }) => {
    sessionStorage.setItem('authorization', '');

    axios
      .post(`${urlAPI}/api/auth/local`, {
        identifier: 'pihoozzz',
        password: '5123260',
      })
      .then((res) => {
        console.log(res);

        sessionStorage.authorization = res.data.jwt;
        // TODO res.data.user - данные пользователя записать в редакс
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container-personal-cabinet'>
      <form className='wrapper-personal-cabinet' onSubmit={handleSubmit(onSubmit)}>
        <p className='personal-cabinet-title'>Вход в личный кабинет</p>

        <div className='container-personal-cabinet-info'>
          <label className='container-personal-cabinet-input'>
            {/* Логин: */}
            <input
              style={{ borderBottom: `1px solid ${errors?.identifier ? '#F42C4F' : '#bfc4c9'}` }}
              className='personal-cabinet-input'
              placeholder='Логин'
              {...register('identifier', {
                required: 'Поле не может быть пустым',
              })}
              autoComplete='identifier'
            />
            <div className='personal-cabinet-input-error'>
              {errors?.identifier?.message && <p>Поле не может быть пустым</p>}
            </div>
          </label>

          <label className='container-personal-cabinet-input'>
            {/* Пароль: */}
            <input
              style={{ borderBottom: `1px solid ${errors?.password ? '#F42C4F' : '#bfc4c9'}` }}
              className='personal-cabinet-input'
              placeholder='Пароль'
              {...register('password', {
                required: 'Поле не может быть пустым',
              })}
              type='password'
              autoComplete='current-password'
            />
            <div className='personal-cabinet-input-error'>
              {errors?.password?.message && <p>Поле не может быть пустым</p>}
            </div>
          </label>
        </div>

        <Link to='/' className='personal-cabinet-link-reset-password'>
          Забыли логин или пароль?
        </Link>
        {/* <div>{errors && <p>Неверный логин или пароль</p>}</div> */}

        <button
          className='personal-cabinet-btn-log-in primary'
          // disabled={!isValid}
          type='submit'
        >
          Вход
        </button>
      </form>

      <div className='container-personal-cabinet-link-registration'>
        <p className='personal-cabinet-link-registration-text'>Нет учётной записи?</p>

        <Link to='/' className='wrapper-personal-cabinet-link-registration'>
          <p className='personal-cabinet-link-registration-text'>Регистрация</p>

          <img className='personal-cabinet-link-registration-icon' src={IconLinkArrow} alt='' />
        </Link>
      </div>
    </div>
  );
};
