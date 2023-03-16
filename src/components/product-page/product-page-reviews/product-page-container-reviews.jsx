/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';

import { ReactComponent as IconMenuArrow } from '../../../assets/icons/general/icon-menu-arrow.svg';

import { ProductPageReview } from './product-page-review/product-page-review';

import './product-page-container-reviews.css';

export const ProductPageContainerReview = ({ product, isOpenReview, onToggleReview }) => {
  const [sortedReview, setSortedReview] = useState([]);

  //   console.log(!!Object.keys(product?.comments));

  useEffect(() => {
    if (product?.comments === undefined) {
      setSortedReview([...product?.comments].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
    }
  }, [product.comments]);

  return (
    <div className="container-page-product-review">
      <div className="container-page-product-review-title">
        <button
          className="btn-page-product-review"
          type="button"
          onClick={onToggleReview}
          data-test-id="button-hide-reviews"
        >
          <h3 className="page-product-review-title">
            Отзывы <span className="page-product-review-amount">{product?.comments?.length}</span>
          </h3>

          <IconMenuArrow className={`page-product-review-title-arrow ${isOpenReview ? 'active' : ''}`} />
        </button>
      </div>

      <div className={`wrapper-page-product-reviews ${isOpenReview ? 'active' : ''}`}>
        {!!sortedReview.length && sortedReview.map((item) => <ProductPageReview comment={item} key={item.id} />)}
      </div>
    </div>
  );
};
