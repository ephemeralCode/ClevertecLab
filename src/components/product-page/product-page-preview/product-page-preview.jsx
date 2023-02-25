import { ProductPageSwiper } from "../product-page-swiper/product-page-swiper";

import './product-page-preview.css'

export const ProductPagePreview = ({ product }) => (
    <>
        <div className="container-page-product-info">
            <div className="container-page-product-img">
                <ProductPageSwiper 
                    product={product}
                />
            </div>

            <div className="container-page-product-description">
                <h2 className="page-product-title" data-test-id='book-title'>{product?.title}</h2>

                <p className="page-product-author">{product?.authors}, {product?.issueYear}</p>

                <button className="page-product-btn primary" type="button">Забронировать</button>
            
                <div className="wrapper-page-product-description-desktop">
                    <h3 className="page-product-description-title">О книге</h3>

                    <p className="page-product-description-text">{product?.description}</p>
                </div>
            </div>
        </div>

        <div className="wrapper-page-product-description-mobile">
            <h3 className="page-product-description-title">О книге</h3>

            <p className="page-product-description-text">{product?.description}</p>
        </div>
    </>
)