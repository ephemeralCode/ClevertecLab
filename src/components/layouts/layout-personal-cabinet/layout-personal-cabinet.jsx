import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import {
  selectLoadingLoadingAuthToken,
  selectValidationResult,
  setValidationResult,
} from '../../../store/slices/loader-slice';

import { Loader } from '../../loader/loader';
import { ValidatonResultMessage } from '../../personal-cabinet/error-message/validation-result-message';

import './layout-personal-cabinet.css';

export const LayoutPersonalCabinet = () => {
  const dispatch = useDispatch();
  const loadingAuthUser = useSelector(selectLoadingLoadingAuthToken);
  const validatonResult = useSelector(selectValidationResult);

  const reauthenticate = () => {
    dispatch(setValidationResult({}));
  };

  return (
    <div className="container-layout-personal-cabinet" data-test-id="auth">
      {loadingAuthUser && <Loader />}

      {Object.keys(validatonResult).length ? (
        <ValidatonResultMessage validatonResult={validatonResult} reauthenticate={reauthenticate} />
      ) : (
        <div className="container-personal-cabinet">
          <p className="layout-personal-cabinet-logo">Cleverland</p>

          <Outlet />
        </div>
      )}
    </div>
  );
};
