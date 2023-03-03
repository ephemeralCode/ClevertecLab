import './error-message.css';

export const ErrorMessage = ({ reauthenticate }) => (
  <div className="container-error-message" data-test-id="status-block">
    <p className="error-message-title">Вход не выполнен</p>

    <p className="error-message-text">Что-то пошло не так. Попробуйте ещё раз</p>

    <button className="error-message-btn primary" type="button" onClick={reauthenticate}>
      Повторить
    </button>
  </div>
);
