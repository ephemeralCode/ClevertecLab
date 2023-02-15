/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { categoryProductsAction, selectCategories } from '../state-manager/loader/loader-slice'

import { ReactComponent as IconMenuArrow } from '../../assets/icons/general/icon-menu-arrow.svg'

import { BtnMenuTypeProduct } from './btn-menu-type-product/btn-menu-type-product'
import { BtnMenuMainContent } from './btn-menu-main-content/btn-menu-main-content'

import './navigation-menu.css'

export const NavigaionMenu = ({ dataTestId }) => {
    const dispatch = useDispatch()
    const categories = useSelector(selectCategories)

    const { pathname: path } = useLocation()
    
    const [isOpenTypeProduct, setIsOpenTypeProduct] = useState(true)
    const [isActivePage, setIsActivePage] = useState(path.split('/')[2])

    useEffect(() => {
        dispatch(categoryProductsAction())
    
    }, [dispatch])

    useEffect(() => {
        if(!path.includes('product')) {
            setIsOpenTypeProduct(false)
            setIsActivePage('all')
        }

    }, [path])

    return (
        <aside className='wrapper-sidebar'>
            <div className='wrapper-sidebar-menu'>
                <BtnMenuMainContent 
                    textContent='Витрина книг'
                    content='product'
                    path={path.split('/')[1]}
                    onToggle={() => setIsOpenTypeProduct(!isOpenTypeProduct)}
                    isActivePage={isActivePage}
                    icon={
                        <IconMenuArrow 
                            className={`icon-menu-btn-sidebar-menu ${isOpenTypeProduct ? 'active' : ''}`} 
                            fill={path.split('/')[1] === 'product' ? '#F83600' : ''} 
                        />
                    }

                    dataTestId={dataTestId[0]}
                />

                <div className={`container-btns-menu ${isOpenTypeProduct ? 'active' : ''}`}>
                    <ul>
                        {
                            categories.map(item => 
                                <BtnMenuTypeProduct
                                    key={item.path}
                                    categories={item}
                                    setIsActivePage={setIsActivePage}

                                    dataTestId={dataTestId[1]}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>

            <div className='container-legal-agreements'>
                <BtnMenuMainContent 
                    textContent='Правила пользования'
                    content='terms-use'
                    path={path.split('/')[1]}
                    
                    dataTestId={dataTestId[2]}
                />

                <BtnMenuMainContent 
                    textContent='Договор оферты'
                    content='offer-agreement'
                    path={path.split('/')[1]}

                    dataTestId={dataTestId[3]}
                    
                />
            </div>
        </aside>
    )
}