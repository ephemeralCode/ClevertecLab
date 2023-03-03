/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconMenuClose } from '../../../assets/icons/general/icon-menu-close.svg';
import iconMenu from '../../../assets/icons/header/icon-menu.svg';
import { NavigaionMenu } from '../../navigation-menu/navigation-menu';

import './header-menu.css';

export const HeaderMenu = ({ isMenuOpen, setIsMenuOpen, onCloseBurger }) => {
  const modalContainer = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (modalContainer.current && !modalContainer.current.contains(e.target)) {
        onCloseBurger();
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [onCloseBurger]);

  return (
    <React.Fragment>
      <button
        className="btn-header-menu"
        type="button"
        data-test-id="button-burger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <IconMenuClose className="header-menu-icon" fill="#F83600" />
        ) : (
          <img className="header-menu-icon" src={iconMenu} alt="menu icon" />
        )}
      </button>

      {isMenuOpen && (
        <div className="container-header-sidebar" ref={modalContainer}>
          <div className="wrapper-header-sidebar">
            <NavigaionMenu
              onCloseBurger={onCloseBurger}
              dataTestId={['burger-showcase', 'burger', 'burger-contract', 'burger-terms']}
            />
          </div>

          <div className="container-btn-user-account">
            <button className="btn-user-account-profile" type="button">
              Профиль
            </button>

            <button
              className="btn-user-account-exit"
              type="button"
              onClick={() => {
                sessionStorage.clear();
                navigate('/auth');
              }}
              data-test-id="exit-button"
            >
              Выход
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
