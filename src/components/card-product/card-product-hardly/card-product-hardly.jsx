import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectSearchValue } from '../../../store/loader/loader-slice';
import { StarRating } from '../../product-general/star-rating/star-rating';
import { CardProductBtn } from '../card-product-btn/card-product-btn';
import { CardProductImage } from '../card-product-image/card-product-image';

import './card-product-hardly.css';

export const CardProductHardly = ({ general, path, groupCardProducts }) => {
  const searchValue = useSelector(selectSearchValue);

  const getHighlightedText = useCallback((text, highlight) => {
    const str = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
      <React.Fragment>
        {str.map((part, i) => (
          <span
            className={`${part.toLowerCase() === highlight.toLowerCase() ? 'hightlight' : ''}`}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            data-test-id={`${part.toLowerCase() === highlight.toLowerCase() ? 'highlight-matches' : ''}`}
          >
            {part}
          </span>
        ))}
      </React.Fragment>
    );
  }, []);

  return (
    <Link to={`/books/${path}/${general.id}`} className="container-product-hardly" data-test-id="card">
      <div className="container-info-product-hardly">
        <CardProductImage image={general.image} groupCardProducts={groupCardProducts} />

        <div>
          <div className="container-feedback-product-hardly">
            <StarRating amount={general?.rating} />
          </div>

          <div className="wrapper-info-product-hardly">
            {/* <h3 className='title-product-hardly'>{light(general.title)}</h3> */}
            <h3 className="title-product-hardly">{getHighlightedText(general.title, searchValue)}</h3>

            <p className="author-product-hardly">{`${general.authors}, ${general.issueYear}`}</p>
          </div>
        </div>
      </div>

      <CardProductBtn isBooked={general?.booking} groupCardProducts={groupCardProducts} />
    </Link>
  );
};
