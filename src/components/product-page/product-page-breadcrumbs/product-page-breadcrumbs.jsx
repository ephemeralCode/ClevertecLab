import { Link } from 'react-router-dom'

import iconBreadcrumbs from '../../../assets/icons/page-product/icon-breadcrumbs.svg'

import './product-page-breadcrumbs.css'

export const ProductPageBreadcrumbs = ({ category, title, path }) => (
    <section className="background-page-product-breadcrumbs">
        <div className="container-page-product-breadcrumbs">
            <div className="wrapper-page-product-breadcrumbs">
                <p className="breadcrumbs-page-product-breadcrumbs-type">
                    <Link 
                        to={`/books/${path}`}
                        className="breadcrumbs-page-product-breadcrumbs-type"
                        
                        data-test-id='breadcrumbs-link'
                    >{category}</Link>

                    <span className="container-page-product-breadcrumbs-icon">
                        <img className="page-product-breadcrumbs-icon" src={iconBreadcrumbs} alt="" />
                    </span>

                    <span className="page-product-breadcrumbs-title" data-test-id='book-name'>{title}</span>
                </p>
            </div>
        </div>
    </section> 
)