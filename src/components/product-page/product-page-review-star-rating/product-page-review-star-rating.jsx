/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import IconStarRatingFull from '../../../assets/icons/card-product/icon-rating/icon-star-rating-full.svg';
import IconStarRatingOutline from '../../../assets/icons/card-product/icon-rating/icon-star-rating-outline.svg';

import './product-page-review-star-rating.css';

export const ProductPageReviewStarRating = ({ amountRating, setAmountRating }) => (
  <div className="container-product-page-review-star-rating">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={i + 1}
          className="container-product-page-review-star-rating-icon"
          type="button"
          onClick={() => setAmountRating(i + 1)}
        >
          <img
            className="product-page-review-star-rating-icon"
            src={i < amountRating ? IconStarRatingFull : IconStarRatingOutline}
            alt=""
          />
        </button>
      ))}
  </div>
);
