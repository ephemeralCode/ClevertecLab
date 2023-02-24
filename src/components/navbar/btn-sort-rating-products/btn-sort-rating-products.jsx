/* eslint-disable prefer-arrow-callback */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import iconBtnSort from '../../../assets/icons/btn/icon-btn-sort.svg'

import { selectSortRating, toggleSortRating } from '../../../store/loader/loader-slice'

import './btn-sort-rating-products.css'

export const BtnSortRatingProducts = () => {
    const dispatch = useDispatch()
    const sortRating = useSelector(selectSortRating)

    return  (
        <button 
            className='btn-search' 
            type='button'
            onClick={() => dispatch(toggleSortRating(!sortRating))}

            data-test-id='sort-rating-button'
        >
            <img className={`icon-btn-sort ${sortRating ? 'ascending' : 'descending'}`} src={iconBtnSort} alt='' />

            <p className='text-btn-sort'>По рейтингу</p>
        </button>
    )
}