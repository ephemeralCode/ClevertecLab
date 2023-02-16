/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { getSelectedProduct, selectProduct } from "../../components/state-manager/loader/loader-slice"

// import previewProduct from '../../assets/images/page-product/preview-product.png'
import iconBreadcrumbs from '../../assets/icons/page-product/icon-breadcrumbs.svg'

import { ProductPageReview } from "../../components/product-page/product-page-review/product-page-review"
import { ProductPageSwiper } from "../../components/product-page/product-page-swiper/product-page-swiper"
import { StarRating } from "../../components/product-general/star-rating/star-rating"

import './product-page.css'

export const ProductPage = () => {
    const dispatch = useDispatch()
    const product = useSelector(selectProduct)

    const { id } = useParams()
    const [isOpenReview, setIsOpenReview] = useState(false)

    useEffect(() => {
        if (product?.id !== Number(id)) {
            dispatch(getSelectedProduct(id))
        }
    
    }, [dispatch, id])
    
    return (
        <section className='product-page'>
            <section className="background-page-product-breadcrumbs">
                <div className="container-page-product-breadcrumbs">
                    <div className="wrapper-page-product-breadcrumbs">
                        <p className="breadcrumbs-page-product-breadcrumbs-type">
                            <span className="breadcrumbs-page-product-breadcrumbs-type">{product?.categories}</span>

                            <span className="container-page-product-breadcrumbs-icon">
                                <img className="page-product-breadcrumbs-icon" src={iconBreadcrumbs} alt="" />
                            </span>

                            <span className="page-product-breadcrumbs-title">{product?.title}</span>
                        </p>
                    </div>
                </div>
            </section>

            {
                Object.keys(product).length &&
                    <main className="container-page-product">
                        <div className="wrapper-page-product">
                            <div>
                                <div className="container-page-product-info">
                                    <div className="container-page-product-img">
                                        <ProductPageSwiper 
                                            product={product}
                                        />
                                    </div>

                                    <div className="container-page-product-description">
                                        <h2 className="page-product-title">{product?.title}</h2>

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
                            </div>

                            <div className="container-page-product-rating">
                                <div className='container-page-product-review-title'>
                                    <h3 className="page-product-rating-title">Рейтинг</h3>
                                </div>

                                <div className="container-page-product-star-rating">
                                    <StarRating 
                                        amount={product?.rating}
                                        showRatingNumber={true}
                                    />  
                                </div>
                            </div>

                            <div className="conrainer-page-product-detailed-info">
                                <div className='container-page-product-review-title'>
                                    <h3 className="page-product-detailed-info-title">Подробная информация</h3>
                                </div>

                                <table className="container-page-product-detailed-info-group">
                                    <tbody className="wrapper-page-product-detailed-info-group-first">
                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Издательство</span>
                                            </td>
                                            
                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.publish}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Год издания</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.issueYear}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Страниц</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.pages}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Переплёт</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.cover}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Формат</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.format}</span>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <tbody className="wrapper-page-product-detailed-info-group-second">
                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Жанр</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.categories}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Вес</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{`${product?.weight} г.`}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">ISBN</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.ISBN}</span>
                                            </td>
                                        </tr>

                                        <tr className="container-page-product-detailed-info-point">
                                            <td>
                                                <span className="page-product-detailed-info-point-first">Изготовитель</span>
                                            </td>

                                            <td>
                                                <span className="page-product-detailed-info-point-second">{product?.producer}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    
                            <ProductPageReview 
                                isOpenReview={isOpenReview}
                                onToggleReview={() => setIsOpenReview(!isOpenReview)}
                            />

                            <button className="page-product-btn-add-review-user primary" data-test-id='button-rating' type="button">Оценить книгу</button>
                        </div>
                    </main>
            }

        </section>
    )
}