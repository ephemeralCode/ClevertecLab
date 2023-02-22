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
    // const sortedProducts = useSelector(selectSortedProducts)
    const sortRating = useSelector(selectSortRating)

    // const { pathname } = useLocation()
    // const path = pathname.split('/')[2]

    // useEffect(() => {
    //     if (sortedProducts?.all?.length) {
    //         const obj = {...sortedProducts}
    //         const sortType = test ? 1 : -1
            
    //         Object.keys(obj).forEach(key => {
    //             obj[key] = [...sortedProducts[key]].sort((x, y) => (x.rating || 0) > (y.rating || 0) ? -1*sortType : 1*sortType)
    //         })

    //         dispatch(setSortedProducts(obj))
    //     }

    // }, [test])

    return  (
        <button 
            className='btn-search' 
            type='button'
            onClick={() => dispatch(toggleSortRating(!sortRating))}
        >
            <img className={`icon-btn-sort ${sortRating ? 'ascending' : 'descending'}`} src={iconBtnSort} alt='' />

            <p className='text-btn-sort'>По рейтингу</p>
        </button>
    )
}