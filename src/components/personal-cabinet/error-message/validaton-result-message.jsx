import { Link, NavLink } from 'react-router-dom';

import './validaton-result-message.css';

export const ValidatonResultMessage = ({ validatonResult, reauthenticate }) => {
  const linkBtn = validatonResult?.action;
  const generalBtn = validatonResult?.action ? false : true;

  console.log(linkBtn, generalBtn);

  return (
    <div className="container-validation-result-message" data-test-id="status-block">
      <p className="validation-result-message-title">{validatonResult.title}</p>

      <p className="validation-result-message-text">{validatonResult.text}</p>

      {linkBtn && (
        <NavLink to={validatonResult.action} type="button" onClick={reauthenticate}>
          <button className="validation-result-message-btn primary" type="button">
            {validatonResult.textBtn}
          </button>
        </NavLink>
      )}

      {generalBtn && (
        <button className="validation-result-message-btn primary" type="button" onClick={reauthenticate}>
          {validatonResult.textBtn}
        </button>
      )}
    </div>
  );
};
