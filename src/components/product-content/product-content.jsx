/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectSearchValue, selectSortedProducts, selectSortRating } from '../../store/loader/loader-slice'

import { CardProductHardly } from '../card-product/card-product-hardly/card-product-hardly'
import { CardProductColumn } from '../card-product/card-product-column/card-product-column'
import { EmptySortResult } from '../empty-sort-result/empty-sort-result'

import './product-content.css'

export const ProductContent = ({ groupCardProducts }) => {
    const sortedProducts = useSelector(selectSortedProducts)
    const searchValue = useSelector(selectSearchValue)
    const sortRating = useSelector(selectSortRating)

    const { pathname } = useLocation()
    const path = pathname.split('/')[2]

    const sortedRatingProducts = useMemo(() => {
        if (sortedProducts?.all?.length) {
            const obj = {...sortedProducts}
            const sortType = sortRating ? 1 : -1
            
            Object.keys(obj).forEach(key => {
                obj[key] = [...sortedProducts[key]].sort((x, y) => (x.rating || 0) > (y.rating || 0) ? -1*sortType : 1*sortType)
            })
            
            return obj[path]
        }

        return sortedProducts[path]

    }, [sortedProducts, sortRating, path])

    const sortedAndfilteredProducts = useMemo(() => {
        if (sortedProducts?.all?.length) {
            return sortedRatingProducts.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()))
        }

    }, [searchValue, sortedRatingProducts])

    const CardProduct = groupCardProducts === 'hardly' ? CardProductHardly : CardProductColumn
    const type = !searchValue.length ? sortedProducts[path] : sortedAndfilteredProducts

    return (
        <div className={`container-products ${groupCardProducts}`}>
            {
                type?.length ?
                    sortedAndfilteredProducts?.map(item => 
                        <CardProduct
                            key={item.id}
                            general={item}
                            path={path}
                            groupCardProducts={groupCardProducts}
                        />
                    )

                :

                <EmptySortResult 
                    content={`${!searchValue.length ? 'category' : 'search'}`} 
                    dataTestId={`${!searchValue.length ? 'empty-category' : 'search-result-not-found'}`} 
                />
            }
        </div>
    )
}