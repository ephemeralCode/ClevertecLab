/* eslint-disable react/no-array-index-key */
import { ReactComponent as IconStarRatingFull } from '../../../assets/icons/card-product/icon-rating/icon-star-rating-full.svg';
import { ReactComponent as IconStarRatingOutline } from '../../../assets/icons/card-product/icon-rating/icon-star-rating-outline.svg';

import './star-rating.css';

export const StarRating = ({ amount, showRatingNumber }) => {
  const rating = amount || 0;

  return rating ? (
    <div className="container-product-star-rating">
      <div className="container-product-star-rating-icon" data-test-id="rating">
        {Array(5)
          .fill(0)
          .map((_, i) =>
            i < rating ? (
              <div key={`star${i}`} data-test-id="star">
                <IconStarRatingFull data-test-id="star-active" />
              </div>
            ) : (
              <div key={`star${i}`} data-test-id="star">
                <IconStarRatingOutline />
              </div>
            )
          )}
      </div>

      {showRatingNumber && <span className="product-rating-number">{rating.toFixed(1)}</span>}
    </div>
  ) : (
    <p className="text-feedback-product">еще нет оценок</p>
  );
};
