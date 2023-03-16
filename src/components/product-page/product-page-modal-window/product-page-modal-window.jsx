import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ProductPageReviewStarRating } from '../product-page-review-star-rating/product-page-review-star-rating';

import { toggleOpenReviewProduct } from '../../../store/slices/navigation-slice';
import { addNewReview, getSelectedProduct } from '../../../store/slices/loader-slice';

import { ReactComponent as IconMenuClose } from '../../../assets/icons/general/icon-menu-close.svg';

import './product-page-modal-window.css';

export const ProductPageModalWindow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userId = JSON.parse(localStorage.getItem('USER_DATA')).id;

  const [amountRating, setAmountRating] = useState(0);
  const [textReview, setTextReview] = useState('');

  const onSubmit = async (rating, text, book, user) => {
    const resultAction = await dispatch(addNewReview({ rating, text, book, user }));

    if (addNewReview.fulfilled.match(resultAction)) {
      dispatch(getSelectedProduct(id));
    }
  };

  return (
    <div className="container-product-page-modal-window">
      <div className="wrapper-product-page-modal-window">
        <button
          className="product-page-modal-window-btn-close-modal"
          type="button"
          onClick={() => dispatch(toggleOpenReviewProduct(false))}
        >
          <IconMenuClose className="product-page-modal-window-icon-close-modal" fill="#F83600" />
        </button>

        <h3 className="product-page-modal-window-title">Оцените книгу</h3>

        <div className="container-product-page-modal-window-star-rating">
          <p className="product-page-modal-window-text">Ваша оценка</p>

          <div className="wrapper-product-page-modal-window-star-rating">
            <ProductPageReviewStarRating amountRating={amountRating} setAmountRating={setAmountRating} />
          </div>

          <textarea
            className="product-page-modal-window-input-text-review"
            placeholder="Оставить отзыв"
            value={textReview}
            onChange={(e) => setTextReview(e.target.value)}
          />
        </div>

        <button
          className="product-page-modal-window-btn-add-review primary"
          type="submit"
          onClick={() => {
            onSubmit(amountRating, textReview, id, userId);
            dispatch(toggleOpenReviewProduct(false));
          }}
        >
          Оценить
        </button>
      </div>
    </div>
  );
};
