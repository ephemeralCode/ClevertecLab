import { NavLink } from 'react-router-dom';

import './btn-menu-type-product.css';

export const BtnMenuTypeProduct = ({ dataTestId, categories, setIsActivePage, sortedProducts, onCloseBurger }) => {
  const selectedCategory = () => {
    setIsActivePage(categories.path);

    if (dataTestId === 'burger') onCloseBurger();
  };

  return (
    <li className="container-btn-menu">
      <NavLink to={`/books/${categories.path}`} className="btn-menu" type="button" onClick={selectedCategory}>
        <span data-test-id={`${dataTestId}-${categories.path === 'all' ? 'books' : categories.path}`}>
          {categories.name}
        </span>

        <span className="quantity-type-product" data-test-id={`${dataTestId}-book-count-for-${categories.path}`}>{`${
          categories.id === 0 ? '' : sortedProducts[categories.path]?.length || 0
        }`}</span>
      </NavLink>
    </li>
  );
};
