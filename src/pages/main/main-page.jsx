/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProductSearch } from '../../components/product-search/product-search'
import { categoryProductsAction, productsAction, selectCategories, selectProducts, setSortedProducts } from '../../store/loader/loader-slice'

import './main-page.css'

export const MainPage = () => {
    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)
    const products = useSelector(selectProducts)

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
                newObj[item.path] = sorted[i].books
            })
            newObj.all = products

            dispatch(setSortedProducts(newObj))
        }
        
    }, [products])

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