import { Navbar } from '../navbar/navbar'
import { ProductContent } from '../product-content/product-content'

export const ProductSearch = ({ groupCardProducts, setGroupCardProducts }) => (
    <>
        <Navbar 
            groupCardProducts={groupCardProducts}
            setGroupCardProducts={setGroupCardProducts}
        />

        <ProductContent 
            groupCardProducts={groupCardProducts}
        />
    </>
)
