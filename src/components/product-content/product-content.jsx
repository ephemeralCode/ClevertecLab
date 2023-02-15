import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { productsAction, selectProducts } from '../state-manager/loader/loader-slice'

import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly'
import { CardProductColumn } from '../card-product/card-product-column/card-product-column'

import './product-content.css'

// import typeProducts from '../../db/books.json'

export const ProductContent = ({ groupCardProducts }) => {
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)

    // const allProducts = useMemo(() => Object.values(typeProducts).flat(), [])
    const { pathname } = useLocation()
    const path = pathname.split('/')[2]
    // const type = path === 'all' ? allProducts : typeProducts[path]

    const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn

    useEffect(() => {
        dispatch(productsAction())
    
    }, [dispatch])

    return (
        <div className={`container-products ${groupCardProducts}`}>
            {
                products?.map(item => 
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