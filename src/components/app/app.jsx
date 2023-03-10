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
import { Registration } from '../../pages/registration/registration';
import { ForgotPass } from '../../pages/forgot-pass/forgot-pass';

export const App = () => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  axios.interceptors.request.use(authRequestInterceptor);

  useEffect(() => {
    const token = sessionStorage.getItem('authorization');

    // if (!token && (path !== '/auth' || path !== '/forgot-pass')) {
    //   navigate('/auth');
    // }

    if (token) {
      if (path === '/auth' || path === '/registration' || path === '/forgot-pass') {
        navigate('/books/all');
      }
    } else {
      // TODO include =?code
      if (path === '/auth' || path === '/registration' || path === '/forgot-pass') return;
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
        <Route path="/auth" element={<Authorization />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-pass" element={<ForgotPass />} />
      </Route>
    </Routes>
  );
};
