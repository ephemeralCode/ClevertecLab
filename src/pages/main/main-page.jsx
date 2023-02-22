/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { ProductSearch } from '../../components/product-search/product-search'
import { categoryProductsAction, productsAction, selectCategories, selectProducts, selectSortedProducts, selectSortRating, setSortedProducts } from '../../store/loader/loader-slice'

import './main-page.css'

export const MainPage = () => {
    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)
    const products = useSelector(selectProducts)
    const sortRating = useSelector(selectSortRating)

    const sortedProducts = useSelector(selectSortedProducts)

    const { pathname } = useLocation()
    const path = pathname.split('/')[2]

    const [groupCardProducts, setGroupCardProducts] = useState('hardly')

    const notEmptyContent = categories.length && products.length
    const sorted = [...categories].map(item => ({...item, books: []}))
    const newObj = {}

    useEffect(() => {
        if (!categories.length) {
            dispatch(categoryProductsAction())
        }
        
    }, [dispatch])

    useEffect(() => {
        if (!products.length) {
            dispatch(productsAction())
        }
        
    }, [dispatch])

    useEffect(() => {
        if (products.length) {
            products.forEach(book => {
                sorted.forEach(item => book.categories.includes(item.name) && item.books.push(book))
            })
            sorted.forEach((item, i) => {
                newObj[item.path] = sorted[i].books.sort((x, y) => (x.rating || 0) > (y.rating || 0) ? -1 : 1)
            })
            newObj.all = [...products].sort((x, y) => (x.rating || 0) > (y.rating || 0) ? -1 : 1)

            dispatch(setSortedProducts(newObj))
        }
        
    }, [products])

    useEffect(() => {
        if (sortedProducts?.all?.length) {
            const obj = {...sortedProducts}
            const sortType = sortRating ? 1 : -1
            
            Object.keys(obj).forEach(key => {
                obj[key] = [...sortedProducts[key]].sort((x, y) => (x.rating || 0) > (y.rating || 0) ? -1*sortType : 1*sortType)
            })

            dispatch(setSortedProducts(obj))
        }

    }, [path, sortRating])

    return (
        <section className='container-content'>
            {
                !!notEmptyContent &&
                    <ProductSearch 
                        groupCardProducts={groupCardProducts}
                        setGroupCardProducts={setGroupCardProducts}
                    />
            }
            
        </section>
    )
}