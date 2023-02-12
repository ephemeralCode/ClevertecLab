import IconStarRatingFull from '../../../assets/icons/card-product/icon-rating/icon-star-rating-full.svg'
import IconStarRatingOutline from '../../../assets/icons/card-product/icon-rating/icon-star-rating-outline.svg'

import './star-rating.css'

export const StarRating = ({ general, amount, showRatingNumber }) => {
    const rating = general?.rating || amount || 0

    return rating ? 
        <div className="container-product-star-rating"> 
            <div className='container-product-star-rating-icon'>
                {
                    Array(5)
                    .fill(0)
                    .map((_, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <img key={`star${i}`} src={i < rating ? IconStarRatingFull : IconStarRatingOutline} alt='' />
                    ))
                } 
            </div>

            { showRatingNumber && <span className='product-rating-number'>{rating.toFixed(1)}</span> }
        </div>

        :

        <p className='text-feedback-product'>еще нет оценок</p>
}
