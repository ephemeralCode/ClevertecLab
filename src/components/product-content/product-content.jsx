import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly'
import { CardProductColumn } from '../card-product/card-product-column/card-product-column'

import './product-content.css'
import typeProducts from '../../db/books.json'

export const ProductContent = ({ groupCardProducts }) => {
    const allProducts = useMemo(() => Object.values(typeProducts).flat(), [])
    const { pathname } = useLocation()
    const path = pathname.split('/')[2]
    const type = path === 'all' ? allProducts : typeProducts[path]

    const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn

    return (
        <div className={`container-products ${groupCardProducts}`}>
            {
                type?.map(item => 
                    <CardProduct
                        key={item.id}
                        general={item}
                        groupCardProducts={groupCardProducts}
                    />
                )
            }
        </div>
    )
}