import { NavLink } from 'react-router-dom';

import './validaton-result-message.css';

export const ValidatonResultMessage = ({ validatonResult, reauthenticate }) => (
  <div className="container-validation-result-message" data-test-id="status-block">
    <p className="validation-result-message-title">{validatonResult.title}</p>

    <p className="validation-result-message-text">{validatonResult.text}</p>

    {validatonResult.action && validatonResult.hasBtn && (
      <NavLink to={validatonResult.action} type="button" onClick={reauthenticate}>
        <button className="validation-result-message-btn primary" type="button">
          {validatonResult.textBtn}
        </button>
      </NavLink>
    )}

    {!validatonResult.action && validatonResult.hasBtn && (
      <button className="validation-result-message-btn primary" type="button" onClick={reauthenticate}>
        {validatonResult.textBtn}
      </button>
    )}
  </div>
);
