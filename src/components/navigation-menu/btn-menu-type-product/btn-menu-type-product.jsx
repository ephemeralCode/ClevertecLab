import { NavLink } from 'react-router-dom'

import './btn-menu-type-product.css'

export const BtnMenuTypeProduct = ({ dataTestId, categories, setIsActivePage }) => (
    <li className='container-btn-menu'>
        <NavLink 
            to={`/books/${categories.path}`} 
            className='btn-menu' 
            type='button'
            data-test-id={dataTestId}
            onClick={() => setIsActivePage(categories.path)}
        >
            { categories.name }
        </NavLink>
    </li>
)
