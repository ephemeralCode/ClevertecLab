/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProductSearch } from '../../components/product-search/product-search';
import {
  categoryProductsAction,
  productsAction,
  selectCategories,
  selectProducts,
  setSortedProducts,
} from '../../store/slices/loader-slice';

import './main-page.css';

export const MainPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);

  const [groupCardProducts, setGroupCardProducts] = useState('hardly');

  const notEmptyContent = categories.length && products.length;
  const token = localStorage.getItem('authorization');

  useEffect(() => {
    if (!categories.length && token) {
      dispatch(categoryProductsAction());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(productsAction());
  }, [dispatch]);

  useEffect(() => {
    const obj = {};

    categories.forEach((item) => {
      obj[item.path] = [];
    });

    obj.all = [...products];
    products.forEach((book) => {
      categories.find((elem) => book?.categories.includes(elem.name) && obj[elem.path].push(book));
    });

    dispatch(setSortedProducts(obj));
  }, [products]);

  return (
    <section className="container-content">
      {!!notEmptyContent && (
        <ProductSearch groupCardProducts={groupCardProducts} setGroupCardProducts={setGroupCardProducts} />
      )}
    </section>
  );
};
