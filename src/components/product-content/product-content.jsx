import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectProducts } from '../../store/loader/loader-slice'

import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly'
import { CardProductColumn } from '../card-product/card-product-column/card-product-column'

import './product-content.css'

export const ProductContent = ({ groupCardProducts }) => {
    const products = useSelector(selectProducts)

    const { pathname } = useLocation()
    const path = pathname.split('/')[2]

    const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn

    return (
        <div className={`container-products ${groupCardProducts}`}>
            {
                products.map(item => 
                    <CardProduct
                        key={item.id}
                        general={item}
                        path={path}
                        groupCardProducts={groupCardProducts}
                    />
                )
            }
        </div>
    )
}