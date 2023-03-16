import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import IconCircleComplete from '../../assets/icons/general/icon-circle-complete.svg';
import IconCircleError from '../../assets/icons/general/icon-circle-error.svg';
import IconClose from '../../assets/icons/general/icon-menu-close.svg';
import { setToastMessage } from '../../store/slices/loader-slice';

import './toast-message.css';

export const ToastMessage = ({ resultLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setToastMessage({}));
    }, 4000);

    return () => {};
  }, [dispatch]);

  return (
    <div
      className={`container-modal-toast-message ${resultLoading.status ? 'complete' : 'error'}`}
      data-test-id="error"
    >
      <div className="wrapper-modal-toast-message">
        <img
          className="modal-toast-message-icon-circle-state"
          src={resultLoading.status ? IconCircleComplete : IconCircleError}
          alt=""
        />

        <p className="modal-toast-message-text">{`${resultLoading.text}`}</p>
      </div>

      <button
        className="container-modal-toast-message-icon-close"
        type="button"
        onClick={() => dispatch(setToastMessage({}))}
      >
        <img className="modal-toast-message-icon-close" src={IconClose} alt="" />
      </button>
    </div>
  );
};
