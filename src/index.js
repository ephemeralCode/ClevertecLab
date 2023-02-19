import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'

import { store } from './store/loader'

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
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route element={<LayoutMainContent />}>
                            <Route index={true} element={<Navigate to='/books/all' />} replace={true} />
                            <Route path='/books/:type' element={<MainPage />} />
                            <Route path='/terms-use' element={<LinkLegalTerms title='Правила пользования' />} />
                            <Route path='/offer-agreement' element={<LinkLegalTerms title='Договор оферты' />} />
                        </Route>

                        <Route path='/books/:type/:id' element={<ProductPage />} replace={true} />
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>
)