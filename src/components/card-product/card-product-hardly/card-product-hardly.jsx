/* eslint-disable arrow-body-style */
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { CardProductImage } from '../card-product-image/card-product-image'
import { CardProductBtn } from '../card-product-btn/card-product-btn'

import { StarRating } from '../../product-general/star-rating/star-rating'

import { Hightlight } from '../hightlight/hightlight'

import { selectSearchValue } from '../../../store/loader/loader-slice'

import './card-product-hardly.css'

export const CardProductHardly = ({ general, path, groupCardProducts }) => {
    const searchValue = useSelector(selectSearchValue)

    const light = useCallback((str) => {
      return <Hightlight filter={searchValue} str={str} />

    }, [searchValue])

    return (
        <Link 
            to={`/books/${path}/${general.id}`} 
            className='container-product-hardly'
            
            data-test-id='card'
        >
            <div className='container-info-product-hardly'>
                <CardProductImage 
                    image={general.image}
                    groupCardProducts={groupCardProducts}
                />

                <div>
                    <div className='container-feedback-product-hardly'>
                        <StarRating
                            amount={general?.rating}
                        />
                    </div>
                    
                    <div className='wrapper-info-product-hardly'>
                        <h3 className='title-product-hardly'>{light(general.title)}</h3>

                        <p className='author-product-hardly'>{`${general.authors}, ${general.issueYear}`}</p>
                    </div>
                </div>
            </div>
        
            <CardProductBtn 
                isBooked={general?.booking}
                groupCardProducts={groupCardProducts}
            />
        </Link>
    )
}