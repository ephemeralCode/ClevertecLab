/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ProductBtn } from '../../product-btn/product-btn';

import './card-btn-type.css';

export const CardBtnType = ({ product, groupCardProducts }) => (
  <div className={`container-btn-book ${groupCardProducts}`}>
    <ProductBtn product={product} />
  </div>
);
