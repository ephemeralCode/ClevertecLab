import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import avatar from '../../assets/images/user/avatar.png';
import { selectUserData } from '../../store/slices/loader-slice';

import { HeaderMenu } from './header-menu/header-menu';

import './header.css';

export const Header = () => {
  const userData = useSelector(selectUserData);

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className={`container-header ${isUserMenuOpen ? 'active' : ''}`}>
      <div className="wrapper-header">
        <Link to="/books/all" className="container-logo-site">
          <img className="logo-site" src={logo} alt="Cleverland" />
        </Link>

        <div className="container-header-menu">
          <HeaderMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onCloseBurger={() => setIsMenuOpen(false)}
          />
        </div>

        <div className="container-header-info">
          <h1 className="title-header">Библиотека</h1>

          <div className="container-user">
            <button className="wrapper-user" type="button" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <p className="name-user">Привет, Иван!</p>

              <img className="avatar-user" src={avatar} alt="user avatar" />
            </button>

            {isUserMenuOpen && (
              <div className="container-user-account">
                <button className="btn-user-account-profile" type="button">
                  Профиль
                </button>

                <button
                  className="btn-user-account-exit"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('authorization');
                    navigate('/auth');
                  }}
                  data-test-id="exit-button"
                >
                  Выход
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
