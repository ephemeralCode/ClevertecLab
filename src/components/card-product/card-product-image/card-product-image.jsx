import previewImageErrorProduct from '../../../assets/images/card-product/preview-image-error-product.png'

import './card-product-image.css'

export const CardProductImage = ({ groupCardProducts, image }) => (
    <img 
        className={`img-preview-product ${groupCardProducts}`} 
        src={`https://strapi.cleverland.by${image?.url ? image.url : previewImageErrorProduct}`} 
        onError={(e) => { e.target.src = previewImageErrorProduct } }
        alt='Превью продукта' 
    />
)