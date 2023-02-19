import iconBreadcrumbs from '../../../assets/icons/page-product/icon-breadcrumbs.svg'

import './product-page-breadcrumbs.css'

export const ProductPageBreadcrumbs = ({ category, title }) => (
    <section className="background-page-product-breadcrumbs">
        <div className="container-page-product-breadcrumbs">
            <div className="wrapper-page-product-breadcrumbs">
                <p className="breadcrumbs-page-product-breadcrumbs-type">
                    <span className="breadcrumbs-page-product-breadcrumbs-type">{category || 'Все книги'}</span>

                    <span className="container-page-product-breadcrumbs-icon">
                        <img className="page-product-breadcrumbs-icon" src={iconBreadcrumbs} alt="" />
                    </span>

                    <span className="page-product-breadcrumbs-title">{title}</span>
                </p>
            </div>
        </div>
    </section> 
)