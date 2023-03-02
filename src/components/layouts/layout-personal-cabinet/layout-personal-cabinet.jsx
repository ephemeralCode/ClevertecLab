import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  selectLoadingLoadingAuthToken,
  selectNetworkErrorMessage,
  toggleNetworkErrorMessage,
} from '../../../store/slices/loader-slice';

import { Loader } from '../../loader/loader';
import { ErrorMessage } from '../../personal-cabinet/error-message/error-message';

import './layout-personal-cabinet.css';

export const LayoutPersonalCabinet = () => {
  const dispatch = useDispatch();
  const loadingAuthUser = useSelector(selectLoadingLoadingAuthToken);
  const networkErrorMessage = useSelector(selectNetworkErrorMessage);

  const reauthenticate = () => {
    dispatch(toggleNetworkErrorMessage(false));
  };

  return (
    <div className="container-layout-personal-cabinet">
      <p className="layout-personal-cabinet-text">Cleverland</p>
      {loadingAuthUser && <Loader />}

      {!networkErrorMessage ? <Outlet /> : <ErrorMessage reauthenticate={reauthenticate} />}
    </div>
  );
};
