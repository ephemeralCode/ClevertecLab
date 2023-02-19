/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProductSearch } from '../../components/product-search/product-search'
import { categoryProductsAction, productsAction, selectCategories, selectProducts } from '../../store/loader/loader-slice'

import './main-page.css'

export const MainPage = () => {
    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)
    const products = useSelector(selectProducts)

    const [groupCardProducts, setGroupCardProducts] = useState('hardly')

    const notEmptyContent = categories.length && products.length

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