import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectProducts, selectSortedProducts } from '../../store/loader/loader-slice'

import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly'
import { CardProductColumn } from '../card-product/card-product-column/card-product-column'

import './product-content.css'
import { EmptySortResult } from '../empty-sort-result/empty-sort-result'

export const ProductContent = ({ groupCardProducts }) => {
    const sortedProducts = useSelector(selectSortedProducts)

    const { pathname } = useLocation()
    const path = pathname.split('/')[2]

    const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn

    // const allProducts = useMemo(() => Object.values(hashMap).flat(), [])

    return (
        <div className={`container-products ${groupCardProducts}`}>
            {
                sortedProducts[path]?.length ?
                    sortedProducts[path]?.map(item => 
                        <CardProduct
                            key={item.id}
                            general={item}
                            path={path}
                            groupCardProducts={groupCardProducts}
                        />
                    )
                :

                <EmptySortResult content='category' />
            }
        </div>
    )
}