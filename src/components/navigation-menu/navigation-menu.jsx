import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ReactComponent as IconMenuArrow } from '../../assets/icons/general/icon-menu-arrow.svg';
import { selectCategories, selectSortedProducts } from '../../store/slices/loader-slice';
import { selectOpenTypeProduct, toggleOpenTypeProduct } from '../../store/slices/navigation-slice';

import { BtnMenuMainContent } from './btn-menu-main-content/btn-menu-main-content';
import { BtnMenuTypeProduct } from './btn-menu-type-product/btn-menu-type-product';

import './navigation-menu.css';

export const NavigaionMenu = ({ dataTestId, onCloseBurger }) => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const isOpenTypeProduct = useSelector(selectOpenTypeProduct);
  const sortedProducts = useSelector(selectSortedProducts);

  const { pathname: path } = useLocation();

  const [isActivePage, setIsActivePage] = useState(path.split('/')[2]);

  const isPageChanged = () => {
    dispatch(toggleOpenTypeProduct(false));
    setIsActivePage('all');
  };

  return (
    <aside className="wrapper-sidebar">
      <div className="wrapper-sidebar-menu">
        <BtnMenuMainContent
          textContent="Витрина книг"
          content="books"
          path={path.split('/')[1]}
          isMenuCategory={() => dispatch(toggleOpenTypeProduct(!isOpenTypeProduct))}
          isActivePage={isActivePage}
          icon={
            !!categories.length && (
              <IconMenuArrow
                className={`icon-menu-btn-sidebar-menu ${isOpenTypeProduct ? 'active' : ''}`}
                fill={path.includes('books') ? '#F83600' : ''}
              />
            )
          }
          dataTestId={dataTestId[0]}
        />

        <div className={`container-btns-menu ${isOpenTypeProduct ? 'active' : ''}`}>
          <ul>
            {categories.map((item) => (
              <BtnMenuTypeProduct
                key={item.path}
                categories={item}
                setIsActivePage={setIsActivePage}
                sortedProducts={sortedProducts}
                onCloseBurger={onCloseBurger}
                dataTestId={dataTestId[1]}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="container-legal-agreements">
        <BtnMenuMainContent
          textContent="Правила пользования"
          content="terms-use"
          isMenuCategory={isPageChanged}
          path={path.split('/')[1]}
          dataTestId={dataTestId[2]}
        />

        <BtnMenuMainContent
          textContent="Договор оферты"
          content="offer-agreement"
          isMenuCategory={isPageChanged}
          path={path.split('/')[1]}
          dataTestId={dataTestId[3]}
        />
      </div>
    </aside>
  );
};
