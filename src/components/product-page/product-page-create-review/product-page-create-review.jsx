import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductPageReviewStarRating } from '../product-page-review-star-rating/product-page-review-star-rating';

import { toggleOpenReviewProduct } from '../../../store/slices/navigation-slice';

import { addNewReview, getSelectedProduct, selectUserData } from '../../../store/slices/loader-slice';

export const ProductPageCreateReview = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const { id } = useParams();

  const userId = JSON.parse(localStorage.getItem('USER_DATA'))?.id || userData.id;

  const [amountRating, setAmountRating] = useState(0);
  const [textReview, setTextReview] = useState('');

  const onSubmit = async (rating, text, book, user) => {
    const resultAction = await dispatch(addNewReview({ rating, text, book, user }));

    if (addNewReview.fulfilled.match(resultAction)) {
      dispatch(getSelectedProduct(id));
    }
  };

  return (
    <React.Fragment>
      <h3 className="product-page-modal-window-title" data-test-id="modal-title">
        Оцените книгу
      </h3>

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
          data-test-id="comment"
        />
      </div>

      <button
        className="product-page-modal-window-btn-add-review primary"
        type="submit"
        onClick={() => {
          onSubmit(amountRating, textReview, id, userId);
          dispatch(toggleOpenReviewProduct(false));
        }}
        data-test-id="button-comment"
      >
        Оценить
      </button>
    </React.Fragment>
  );
};
