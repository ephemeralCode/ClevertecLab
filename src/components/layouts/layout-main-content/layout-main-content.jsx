import { Outlet } from 'react-router-dom'

import { NavigaionMenu } from '../../navigation-menu/navigation-menu'

import './layout-main-content.css'

export const LayoutMainContent = () => (
    <main className='container-main-content'>
        <div className='wrapper-main-content'>
            <div className='container-sidebar'>
                <NavigaionMenu 
                    dataTestId={['navigation-showcase', 'navigation-books', 'navigation-terms', 'navigation-contract']}
                />
            </div>

            <Outlet />
        </div>
    </main>
)