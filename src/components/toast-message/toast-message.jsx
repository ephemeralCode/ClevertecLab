import { useDispatch } from 'react-redux';

import IconCircleComplete from '../../assets/icons/general/icon-circle-complete.svg';
import IconCircleError from '../../assets/icons/general/icon-circle-error.svg';
import IconClose from '../../assets/icons/general/icon-menu-close.svg';
import { toggleToastMessage } from '../../store/slices/loader-slice';

import './toast-message.css';

export const ToastMessage = ({ readiness, changes }) => {
  const dispatch = useDispatch();

  // TODO complete toast
  const ready = readiness;

  return (
    <div className={`container-modal-toast-message ${ready ? 'complete' : 'error'}`} data-test-id="error">
      <div className="wrapper-modal-toast-message">
        <img
          className="modal-toast-message-icon-circle-state"
          src={readiness ? IconCircleComplete : IconCircleError}
          alt=""
        />

        <p className="modal-toast-message-text">{`${
          changes ? 'Изменения успешно сохранены!' : 'Что-то пошло не так. Обновите страницу через некоторое время.'
        }`}</p>
      </div>

      <button
        className="container-modal-toast-message-icon-close"
        type="button"
        onClick={() => dispatch(toggleToastMessage(false))}
      >
        <img className="modal-toast-message-icon-close" src={IconClose} alt="" />
      </button>
    </div>
  );
};
