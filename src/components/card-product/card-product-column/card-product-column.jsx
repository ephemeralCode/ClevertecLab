import { Link } from 'react-router-dom';

import { StarRating } from '../../product-general/star-rating/star-rating';
import { ProductBtn } from '../../product-btn/product-btn.jsx';
import { CardProductImage } from '../card-product-image/card-product-image.jsx';

import './card-product-column.css';

export const CardProductColumn = ({ general, path, groupCardProducts }) => (
  <Link to={`/books/${path}/${general.id}`} className="container-product-column" data-test-id="card">
    <CardProductImage image={general.image} groupCardProducts={groupCardProducts} />

    <div className="container-info-product-column">
      <div className="wrapper-info-product-column">
        <h3 className="title-product-column">{general.title}</h3>

        <p className="author-product-column">{`${general.authors}, ${general.issueYear}`}</p>
      </div>

      <div className="container-feedback-product-column">
        <div>
          <StarRating amount={general?.rating} />
        </div>

        <ProductBtn isBooked={general?.booking} groupCardProducts={groupCardProducts} />
      </div>
    </div>
  </Link>
);
