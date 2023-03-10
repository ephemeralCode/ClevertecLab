import { Link } from 'react-router-dom';

import './validaton-result-message.css';

export const ValidatonResultMessage = ({ validatonResult, reauthenticate }) => (
  <div className="container-validation-result-message" data-test-id="status-block">
    <p className="validation-result-message-title">{validatonResult.title}</p>

    <p className="validation-result-message-text">{validatonResult.text}</p>

    {validatonResult?.action && validatonResult?.haveBtn && (
      <Link
        to={validatonResult.action}
        className="validation-result-message-btn primary"
        type="button"
        onClick={reauthenticate}
      >
        {validatonResult.textBtn}
      </Link>
    )}

    {validatonResult?.textBtn && validatonResult?.haveBtn && (
      <button className="validation-result-message-btn primary" type="button" onClick={reauthenticate}>
        {validatonResult.textBtn}
      </button>
    )}
  </div>
);
