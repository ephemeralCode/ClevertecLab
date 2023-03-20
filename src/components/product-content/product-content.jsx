import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectSortedProducts } from '../../store/slices/loader-slice';
import { selectSearchValue, selectSortRating } from '../../store/slices/sort-slice';

import { CardProductColumn } from '../card-product/card-product-column/card-product-column';
import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly';
import { EmptySortResult } from '../empty-sort-result/empty-sort-result';

import './product-content.css';

export const ProductContent = ({ groupCardProducts }) => {
  const sortedProducts = useSelector(selectSortedProducts);
  const searchValue = useSelector(selectSearchValue);
  const sortRating = useSelector(selectSortRating);

  const { pathname } = useLocation();
  const path = pathname.split('/')[2];

  const sortedRatingProducts = useMemo(() => {
    if (sortedProducts?.all?.length) {
      const obj = { ...sortedProducts };
      const sortType = sortRating ? 1 : -1;

      Object.keys(obj).forEach((key) => {
        obj[key] = [...sortedProducts[key]].sort((x, y) =>
          (x.rating || 0) > (y.rating || 0) ? -1 * sortType : 1 * sortType
        );
      });

      return obj[path];
    }

    return sortedProducts[path];
  }, [sortedProducts, sortRating, path]);

  const sortedAndFilteredProducts = useMemo(() => {
    if (sortedProducts?.all?.length) {
      return sortedRatingProducts.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()));
    }

    return sortedRatingProducts;
  }, [searchValue, sortedRatingProducts, sortedProducts]);

  const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn;
  const type = searchValue.length ? sortedAndFilteredProducts : sortedProducts[path];

  return (
    <div className={`container-products ${groupCardProducts}`} data-test-id="content">
      {type?.length ? (
        sortedAndFilteredProducts?.map((item) => (
          <CardProduct key={item.id} general={item} path={path} groupCardProducts={groupCardProducts} />
        ))
      ) : (
        <EmptySortResult
          content={`${searchValue.length ? 'search' : 'category'}`}
          dataTestId={`${searchValue.length ? 'search-result-not-found' : 'empty-category'}`}
        />
      )}
    </div>
  );
};
