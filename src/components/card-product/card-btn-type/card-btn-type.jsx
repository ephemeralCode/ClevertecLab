import { ProductBtn } from '../../product-btn/product-btn';

import './card-btn-type.css';

export const CardBtnType = ({ isBooked, groupCardProducts }) => (
  <div className={`container-btn-book ${groupCardProducts}`} type="button">
    <ProductBtn isBooked={isBooked} />
  </div>
);
