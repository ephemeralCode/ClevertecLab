import { ReactComponent as IconLoader } from '../../assets/icons/loader/icon-loader.svg';

import './loader.css';

export const Loader = () => (
  <div className="container-loader" data-test-id="loader">
    <IconLoader className="icon-loader" />
  </div>
);
