import { useState } from 'react'

import { ProductSearch } from '../../components/product-search/product-search'

import './main-page.css'

export const MainPage = () => {
    const [groupCardProducts, setGroupCardProducts] = useState('hardly')

    return (
        <section className='container-content'>
            <ProductSearch 
                groupCardProducts={groupCardProducts}
                setGroupCardProducts={setGroupCardProducts}
            />
        </section>
    )
}
