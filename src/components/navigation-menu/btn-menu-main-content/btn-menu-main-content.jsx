import { Link } from 'react-router-dom'

import './btn-menu-main-content.css'

export const BtnMenuMainContent = ({ content, textContent, icon, path, isActivePage, isMenuCategory, dataTestId }) => (
    <Link 
        to={`/${content}/${isActivePage ? isActivePage : ''}`}
        className={`btn-sidebar-menu ${content === path ? 'active' : ''}`}
        type='button'
        onClick={isMenuCategory}

        data-test-id={dataTestId}
    >
        { textContent }
        { icon }
    </Link>
)