import { ReactComponent as IconStarRatingFull } from '../../../assets/icons/card-product/icon-rating/icon-star-rating-full.svg';
import { ReactComponent as IconStarRatingOutline } from '../../../assets/icons/card-product/icon-rating/icon-star-rating-outline.svg';

import './product-page-review-star-rating.css';

export const ProductPageReviewStarRating = ({ amountRating, setAmountRating }) => (
  <div className="container-product-page-review-star-rating" data-test-id="rating">
    {Array(5)
      .fill(0)
      .map((_, i) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={i + 1}
          className="container-product-page-review-star-rating-icon"
          type="button"
          onClick={() => setAmountRating(i + 1)}
          data-test-id="star"
        >
          {i < amountRating ? (
            <IconStarRatingFull className="product-page-review-star-rating-icon" data-test-id="star-active" />
          ) : (
            <IconStarRatingOutline className="product-page-review-star-rating-icon" />
          )}
        </button>
      ))}
  </div>
);
