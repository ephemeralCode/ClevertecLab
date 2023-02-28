import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as IconGroupColumn } from '../../assets/icons/btn/icon-group-column.svg';
import { ReactComponent as IconGroupHardly } from '../../assets/icons/btn/icon-group-hardly.svg';
import iconBtnSearch from '../../assets/icons/btn/icon-input-sort.svg';
import { ReactComponent as IconMenuClose } from '../../assets/icons/general/icon-menu-close.svg';
import { selectSearchValue, setSearchValue } from '../../store/loader/loader-slice';

import { BtnGroup } from './btn-group/btn-group';
import { BtnSortRatingProducts } from './btn-sort-rating-products/btn-sort-rating-products';

import './navbar.css';

export const Navbar = ({ groupCardProducts, setGroupCardProducts }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchValue);

  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);

  return (
    <nav className="container-navbar">
      <div className="container-search">
        {!isOpenMobileSearch && (
          <button
            type="button"
            data-test-id="button-search-open"
            className={`btn-search-open-mobile ${isOpenMobileSearch ? 'active' : ''}`}
            onClick={() => setIsOpenMobileSearch(!isOpenMobileSearch)}
          >
            <img src={iconBtnSearch} alt="icon search" />
          </button>
        )}

        <label className={`wrapper-input-search ${isOpenMobileSearch ? 'active' : ''}`}>
          <input
            className="input-search"
            type="text"
            placeholder="Поиск книги или автора…"
            value={searchValue}
            onChange={(e) => dispatch(setSearchValue(e.target.value))}
            data-test-id="input-search"
          />

          {isOpenMobileSearch && (
            <button
              className="input-search-btn-close"
              type="button"
              data-test-id="button-search-close"
              onClick={() => setIsOpenMobileSearch(!isOpenMobileSearch)}
            >
              <IconMenuClose className="input-search-btn-close-icon" fill="#F83600" />
            </button>
          )}
        </label>

        {!isOpenMobileSearch && <BtnSortRatingProducts />}
      </div>

      {!isOpenMobileSearch && (
        <div className="container-btn-group">
          <BtnGroup
            active={groupCardProducts === 'hardly'}
            icon={<IconGroupColumn fill={`${groupCardProducts === 'hardly' ? '#FFF' : '#A7A7A7'}`} />}
            setGroupCardProducts={setGroupCardProducts}
            groupValue="hardly"
            dataTestId="button-menu-view-window"
          />

          <BtnGroup
            active={groupCardProducts === 'column'}
            icon={<IconGroupHardly fill={`${groupCardProducts === 'column' ? '#FFF' : '#A7A7A7'}`} />}
            setGroupCardProducts={setGroupCardProducts}
            groupValue="column"
            dataTestId="button-menu-view-list"
          />
        </div>
      )}
    </nav>
  );
};
