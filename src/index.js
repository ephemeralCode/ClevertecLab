import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'

import { MainPage } from './pages/main'
import { ProductPage } from './pages/product'

import { Layout } from './components/layouts/layout/layout'
import { LayoutMainContent } from './components/layouts/layout-main-content/layout-main-content'
import { LinkLegalTerms } from './components/link-legal-terms/link-legal-terms'

import './css/index.css'
import './css/fonts.css'
import './css/atoms.css'
import './css/adaptive.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route element={<LayoutMainContent />}>
                        <Route index={true} element={<Navigate to='/product/all' />} replace={true} />
                        <Route path='/product/:type' element={<MainPage />} />
                        <Route path='/terms-use' element={<LinkLegalTerms title='Правила пользования' />} />
                        <Route path='/offer-agreement' element={<LinkLegalTerms title='Договор оферты' />} />
                    </Route>

                    <Route path='/product/:type/:id' element={<ProductPage />} replace={true} />
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>
)