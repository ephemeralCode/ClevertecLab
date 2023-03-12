import React from 'react';

import { Navbar } from '../navbar/navbar';
import { ProductContent } from '../product-content/product-content';

export const ProductSearch = ({ groupCardProducts, setGroupCardProducts }) => (
  <React.Fragment>
    <Navbar groupCardProducts={groupCardProducts} setGroupCardProducts={setGroupCardProducts} />

    <ProductContent groupCardProducts={groupCardProducts} />
  </React.Fragment>
);
