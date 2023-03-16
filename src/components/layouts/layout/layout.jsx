import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { selectLoadingCategories, selectLoadingProducts, selectToastMessage } from '../../../store/slices/loader-slice';
import { selectOpenReviewProduct } from '../../../store/slices/navigation-slice';

import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import { Loader } from '../../loader/loader';
import { ProductPageModalWindow } from '../../product-page/product-page-modal-window/product-page-modal-window';
import { ToastMessage } from '../../toast-message/toast-message';

import './layout.css';

export const Layout = () => {
  const loadingCategoies = useSelector(selectLoadingCategories);
  const loadingProducts = useSelector(selectLoadingProducts);
  const isOpenReviewProduct = useSelector(selectOpenReviewProduct);
  const resultLoading = useSelector(selectToastMessage);

  const loading = loadingCategoies || loadingProducts;

  return (
    <div className="container">
      {loading && <Loader />}
      {!!Object.keys(resultLoading).length && <ToastMessage resultLoading={resultLoading} />}
      {isOpenReviewProduct && <ProductPageModalWindow />}

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
