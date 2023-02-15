/* eslint-disable react/no-array-index-key */
import { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs, Pagination } from "swiper"

import previewImageErrorProduct from '../../../assets/images/card-product/preview-image-error-product.png'

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/thumbs"
import "swiper/css/pagination"

import "./product-page-swiper.css"

export const ProductPageSwiper = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    return ( 
        <>
            <Swiper
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[ Thumbs, Pagination ]}
                slidesPerView={1}
                spaceBetween={0}
                grabCursor={true}
                watchSlidesProgress={true}
                pagination={{ clickable: false }}
                breakpoints={{
                    768: {
                        pagination: {
                            clickable: true
                        }
                    },
                }}
                className="page-product-img"
                data-test-id='slide-big'
            >
                {
                    product?.images && 
                        Array.isArray(product.images) &&
                            product.images.map((item, i) => 
                                <SwiperSlide key={`Image-${i}`}>
                                    <img 
                                        src={`https://strapi.cleverland.by${item.url}`} 
                                        alt='Основная картинка товара' 
                                        onError={(e) => { e.target.src = previewImageErrorProduct } }
                                    />
                                </SwiperSlide>)
                }
            </Swiper>
            
            {
                product?.images?.length > 1 &&
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={30}
                        slidesPerView={5}
                        grabCursor={true}
                        watchSlidesProgress={true}
                        loop={true}
                        modules={[ Thumbs ]}
                        className="container-page-product-img-preview"
                    >
                        {
                            product?.images && 
                                Array.isArray(product.images) &&
                                    product.images.map((item, i) => 
                                        <SwiperSlide key={`Preview-Image-${i}`}  data-test-id='slide-mini'>
                                            <img 
                                                src={`https://strapi.cleverland.by${item.url}`}  
                                                alt='Превью товара'
                                                onError={(e) => { e.target.src = previewImageErrorProduct } }
                                            />
                                        </SwiperSlide>)
                        }
                    </Swiper>
            }
        </>
    )
}