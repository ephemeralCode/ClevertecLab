/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { MainPage } from '../../pages/main';
import { ProductPage } from '../../pages/product';
import { Authorization } from '../../pages/authorization/authorization';

import { Layout } from '../layouts/layout/layout';
import { LayoutMainContent } from '../layouts/layout-main-content/layout-main-content';
import { LayoutPersonalCabinet } from '../layouts/layout-personal-cabinet/layout-personal-cabinet';
import { LinkLegalTerms } from '../link-legal-terms/link-legal-terms';

import { authRequestInterceptor } from '../../api/axios';

export const App = () => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  axios.interceptors.request.use(authRequestInterceptor);

  useEffect(() => {
    const token = sessionStorage.getItem('authorization');

    if (!token && (path !== '/auth' || path !== '/forgot-pass')) {
      navigate('/auth');
    }
  }, [path]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<LayoutMainContent />}>
          <Route index={true} element={<Navigate to="/books/all" />} replace={true} />
          <Route path="/books/:type" element={<MainPage />} />
          <Route path="/terms-use" element={<LinkLegalTerms title="Правила пользования" />} />
          <Route path="/offer-agreement" element={<LinkLegalTerms title="Договор оферты" />} />
        </Route>

        <Route path="/books/:type/:id" element={<ProductPage />} replace={true} />
      </Route>

      <Route element={<LayoutPersonalCabinet />}>
        {/* <Route index={true} element={<Navigate to='/auth' />} replace={true} /> */}
        <Route path="/auth" element={<Authorization />} />
        {/* <Route path='/registration' element={} />
        <Route path='/forgot-pass' element={} /> */}
      </Route>
    </Routes>
  );
};
