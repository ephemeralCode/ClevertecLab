import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// import previewProduct from '../../assets/images/page-product/preview-product.png'
import iconBreadcrumbs from '../../assets/icons/page-product/icon-breadcrumbs.svg'

import './product-page.css'

import products from '../../db/books.json'

import { ProductPageReview } from "../../components/product-page/product-page-review/product-page-review"
import { ProductPageSwiper } from "../../components/product-page/product-page-swiper/product-page-swiper"
import { StarRating } from "../../components/product-general/star-rating/star-rating"

export const ProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState('');
    const [isOpenReview, setIsOpenReview] = useState(false);

    // placeholder для динамичесекого получения данных и добавления их, в моем json слишком мало нужных данных
    useEffect(() => {
        if (id) {
            const product = Object.values(products)
                .flat()
                .find((item) => item.id === id)
        
            if (product) {
                setProduct(product)
            }
        }
    
    }, [id])
    
    return (
        <section className='product-page'>
            <section className="background-page-product-breadcrumbs">
                <div className="container-page-product-breadcrumbs">
                    <div className="wrapper-page-product-breadcrumbs">
                        <p className="breadcrumbs-page-product-breadcrumbs-type">
                            <span className="breadcrumbs-page-product-breadcrumbs-type">Бизнес книги</span>

                            <span className="container-page-product-breadcrumbs-icon">
                                <img className="page-product-breadcrumbs-icon" src={iconBreadcrumbs} alt="" />
                            </span>

                            <span className="page-product-breadcrumbs-title">Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих</span>
                        </p>
                    </div>
                </div>
            </section>

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
                                <h2 className="page-product-title">Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих</h2>

                                <p className="page-product-author">Адитья Бхаргава, 2019</p>

                                <button className="page-product-btn primary" type="button">Забронировать</button>
                            
                                <div className="wrapper-page-product-description-desktop">
                                    <h3 className="page-product-description-title">О книге</h3>

                                    <p className="page-product-description-text">
                                        Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время? 
                                        <br /><br /> 
                                        Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="wrapper-page-product-description-mobile">
                            <h3 className="page-product-description-title">О книге</h3>

                            <p className="page-product-description-text">
                                Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время? 
                                <br /><br /> 
                                Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.
                            </p>
                        </div>
                    </div>

                    <div className="container-page-product-rating">
                        <div className='container-page-product-review-title'>
                            <h3 className="page-product-rating-title">Рейтинг</h3>
                        </div>

                        <div className="container-page-product-star-rating">
                            <StarRating 
                                amount={4}
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
                                        <span className="page-product-detailed-info-point-second">Питер</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Год издания</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">2019</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Страниц</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">288</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Переплёт</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">Мягкая обложка</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Формат</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">70х100</span>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody className="wrapper-page-product-detailed-info-group-second">
                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Жанр</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">Компьютерная литература</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Вес</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">370 г</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">ISBN</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">978-5-4461-0923-4</span>
                                    </td>
                                </tr>

                                <tr className="container-page-product-detailed-info-point">
                                    <td>
                                        <span className="page-product-detailed-info-point-first">Изготовитель</span>
                                    </td>

                                    <td>
                                        <span className="page-product-detailed-info-point-second">ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29</span>
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
        </section>
    )
}