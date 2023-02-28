import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/logo.svg';
import avatar from '../../assets/images/user/avatar.png';

import { HeaderMenu } from './header-menu/header-menu';

import './header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="container-header">
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
            <p className="name-user">Привет, Иван!</p>

            <img className="avatar-user" src={avatar} alt="user avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};
