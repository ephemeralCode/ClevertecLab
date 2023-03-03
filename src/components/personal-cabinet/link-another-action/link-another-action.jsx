import React from 'react';
import { Link } from 'react-router-dom';

import IconLinkArrow from '../../../assets/icons/btn/icon-link-arrow.svg';

import './link-another-action.css';

export const LinkAnotherAction = ({ textContent, action, linkText }) => (
  <React.Fragment>
    <p className="another-action-text">{textContent}</p>

    <Link to={action} className="wrapper-another-action-link">
      <p className="another-action-link-text">{linkText}</p>

      <img className="another-action-link-icon" src={IconLinkArrow} alt="" />
    </Link>
  </React.Fragment>
);
