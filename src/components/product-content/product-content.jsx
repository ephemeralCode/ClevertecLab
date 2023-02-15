/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { productsAction, selectProducts } from '../state-manager/loader/loader-slice'

import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly'
import { CardProductColumn } from '../card-product/card-product-column/card-product-column'

import './product-content.css'

export const ProductContent = ({ groupCardProducts }) => {
    const dispatch = useDispatch()
    const products = useSelector(selectProducts)

    // const allProducts = useMemo(() => Object.values(typeProducts).flat(), [])
    const { pathname } = useLocation()
    const path = pathname.split('/')[2]
    // const type = path === 'all' ? allProducts : typeProducts[path]

    const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn

    useEffect(() => {
        if (!products.length) {
            dispatch(productsAction())
            console.log('123')
        }
        
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