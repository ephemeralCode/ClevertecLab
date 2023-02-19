/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import iconMenu from '../../../assets/icons/header/icon-menu.svg'
import { ReactComponent as IconMenuClose } from '../../../assets/icons/general/icon-menu-close.svg'

import { NavigaionMenu } from '../../navigation-menu/navigation-menu'

import './header-menu.css'

export const HeaderMenu = ({ isMenuOpen, setIsMenuOpen, onClose }) => {
    const modalContainer = useRef()
    const { pathname: path } = useLocation()

    useEffect(() => {
        const onClickOutside = (e) => {
            if (modalContainer.current && !modalContainer.current.contains(e.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', onClickOutside)

        return () => {
            document.removeEventListener('mousedown', onClickOutside)
        }
        
    }, [onClose])

    useEffect(() => {
        onClose()
        
    }, [path])

    return (
        <>
            <button 
                className='btn-header-menu'
                type='button'
                data-test-id='button-burger'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {
                    isMenuOpen ?
                        <IconMenuClose className='header-menu-icon' fill='#F83600' />

                        :

                        <img className='header-menu-icon' src={iconMenu} alt='Меню' />
                }
            </button>

            {
                isMenuOpen &&
                    <div 
                        className='container-header-sidebar'
                        ref={modalContainer}
                    >
                        <div className='wrapper-header-sidebar'>
                            <NavigaionMenu 
                                dataTestId={['burger-showcase', 'burger-books','burger-contract', 'burger-terms']}
                            />
                        </div>

                        <div className='container-btn-user-account'>
                            <button className='btn-user-account-profile' type='button'>Профиль</button>

                            <button className='btn-user-account-exit' type='button'>Выход</button>
                        </div>
                    </div>
            }
        </>
    )
}