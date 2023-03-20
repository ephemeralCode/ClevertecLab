import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductPageCreateReview } from '../product-page-create-review/product-page-create-review';
import { ProductPageBookBooking } from '../product-page-book-booking/product-page-book-booking';

import {
  selectTypeModalWindowProduct,
  setTypeModalWindowProduct,
  toggleOpenReviewProduct,
} from '../../../store/slices/navigation-slice';

import { ReactComponent as IconMenuClose } from '../../../assets/icons/general/icon-menu-close.svg';

import './product-page-modal-window.css';

export const ProductPageModalWindow = () => {
  const dispatch = useDispatch();
  const typeModalWindow = useSelector(selectTypeModalWindowProduct);

  const modalContainer = useRef();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (modalContainer.current && !modalContainer.current.contains(e.target)) {
        dispatch(setTypeModalWindowProduct(''));
        dispatch(toggleOpenReviewProduct(false));
      }
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [typeModalWindow, dispatch]);

  return (
    <div className="container-product-page-modal-window" data-test-id="modal-outer">
      <div
        className="wrapper-product-page-modal-window"
        ref={modalContainer}
        data-test-id={`${typeModalWindow === 'review' ? 'modal-rate-book' : 'booking-modal'}`}
      >
        <button
          className="product-page-modal-window-btn-close-modal"
          type="button"
          onClick={() => dispatch(toggleOpenReviewProduct(false))}
          data-test-id="modal-close-button"
        >
          <IconMenuClose className="product-page-modal-window-icon-close-modal" fill="#F83600" />
        </button>

        {typeModalWindow === 'booking' && <ProductPageBookBooking newBooking={true} />}
        {typeModalWindow === 'repeatBooking' && <ProductPageBookBooking newBooking={false} />}
        {typeModalWindow === 'review' && <ProductPageCreateReview />}
      </div>
    </div>
  );
};
