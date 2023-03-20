import 'dayjs/locale/ru';
import dayjs from 'dayjs';

import { StarRating } from '../../../product-general/star-rating/star-rating';

import userImage from '../../../../assets/images/page-product/user-image.png';

import './product-page-review.css';

export const ProductPageReview = ({ comment }) => {
  dayjs.locale('ru');

  return (
    <div className="wrapper-page-product-review" data-test-id="comment-wrapper">
      <div className="container-page-product-review-user-info">
        <img className="page-product-review-user-img" src={userImage} alt="current user" />

        <div className="wrapper-page-product-review-user">
          <p className="page-product-review-user-name" data-test-id="comment-author">
            {`${comment.user.firstName} ${comment.user.lastName}`}
          </p>

          <span className="page-product-review-date" data-test-id="comment-date">
            {`${dayjs(comment.createdAt).format('DD MMMM YYYY')}`}
          </span>
        </div>
      </div>

      <div className="page-product-review-star-rate">
        <StarRating amount={comment.rating} />
      </div>

      <p className="page-product-review-comment" data-test-id="comment-text">
        {comment.text}
      </p>
    </div>
  );
};
