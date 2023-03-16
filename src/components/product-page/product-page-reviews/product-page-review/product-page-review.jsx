import { StarRating } from '../../../product-general/star-rating/star-rating';

import userImage from '../../../../assets/images/page-product/user-image.png';

import './product-page-review.css';

export const ProductPageReview = ({ comment }) => {
  const date = new Date(comment.createdAt);
  const day = String(date.getDay()).padStart(2, '0');
  const month = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  return (
    <div className="wrapper-page-product-review">
      <div className="container-page-product-review-user-info">
        <img className="page-product-review-user-img" src={userImage} alt="current user" />

        <div className="wrapper-page-product-review-user">
          <p className="page-product-review-user-name">{`${comment.user.firstName} ${comment.user.lastName}`}</p>
          <p className="page-product-review-date">{`${day} ${month[date.getMonth()]} ${date.getFullYear()}`}</p>
        </div>
      </div>

      <div className="page-product-review-star-rate">
        <StarRating amount={comment.rating} />
      </div>

      <p className="page-product-review-comment">{comment.text}</p>
    </div>
  );
};
