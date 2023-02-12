import { Link } from 'react-router-dom'

import { CardProductImage } from '../card-product-image/card-product-image.jsx'
import { CardProductBtn } from '../card-product-btn/card-product-btn.jsx'

import './card-product-column.css'
import { StarRating } from '../../product-general/star-rating/star-rating'

export const CardProductColumn = ({ general, groupCardProducts }) => (
    <Link 
        to={`/product/${general.category}/${general.id}`} 
        className='container-product-column'

        data-test-id='card'
    >
        <CardProductImage 
            image={general.image[0]}
            groupCardProducts={groupCardProducts}
        />

        <div className='container-info-product-column'>
            <div className='wrapper-info-product-column'>
                <h3 className='title-product-column'>{general.title}</h3>

                <p className='author-product-column'>{`${general.author}, ${general.year}`}</p>
            </div>

            <div className='container-feedback-product-column'>
                <div>
                    <StarRating 
                        general={general}
                    />
                </div>

                <CardProductBtn 
                    isBooked={general.isBooked}
                    bookedTill={general.bookedTill}
                    groupCardProducts={groupCardProducts}
                />
            </div>
        </div>
    </Link>
)
