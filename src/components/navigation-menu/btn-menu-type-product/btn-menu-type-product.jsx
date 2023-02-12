import { NavLink } from 'react-router-dom'

import './btn-menu-type-product.css'

export const BtnMenuTypeProduct = ({ products, dataTestId, allBooks, setIsActivePage }) => (
    <li className='container-btn-menu'>
        <NavLink 
            to={`/product/${products.typeProduct}`} 
            className='btn-menu' 
            type='button'
            data-test-id={dataTestId}
            onClick={() => setIsActivePage(products.typeProduct)}
        >
            { products.btnName }

            <span className='quantity-type-product'>{`${products.typeProduct !== 'all' ? allBooks[products.typeProduct].length : ''}`}</span>
        </NavLink>
    </li>
)
