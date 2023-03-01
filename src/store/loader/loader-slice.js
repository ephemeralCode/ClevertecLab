/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import { urlAPI } from '../../api/api';

// export const authorizationUserAction = createAsyncThunk('authorizationUser', async (_, thunkApi) => {
//     const result = await axios.post(`${urlAPI}/api/auth/local`)
//     .then((res) => {
//         console.log(res);
//       })
//     .catch((err) => {
//         console.log(err);
//     });
  
//     return result;
//   });

export const categoryProductsAction = createAsyncThunk('categories', async (_, thunkApi) => {
  const result = await axios.get(`${urlAPI}/api/categories`).catch(() => {
    thunkApi.dispatch(toggleToastMessage(true));
  });

  if (result.status === 200 && result.data) {
    const arr = [{ name: 'Все книги', path: 'all', id: 0 }].concat(result.data);

    thunkApi.dispatch(setCategories(arr));
  }

  return result.data;
});

export const productsAction = createAsyncThunk('products', async (_, thunkApi) => {
  const result = await axios.get(`${urlAPI}/api/books`).catch(() => {
    thunkApi.dispatch(toggleToastMessage(true));
  });

  if (result.status === 200 && result.data) {
    thunkApi.dispatch(setProducts(result.data));
  }

  return result.data;
});

export const getSelectedProduct = createAsyncThunk('product', async (id, thunkApi) => {
  const result = await axios.get(`${urlAPI}/api/books/${id}`).catch(() => {
    thunkApi.dispatch(toggleToastMessage(true));
  });

  if (result.status === 200) {
    thunkApi.dispatch(setProduct(result.data));
  }

  return result.data;
});

const initialState = {
  loadingCategories: false,
  loadingProducts: false,
  toastMessage: false,
  sortRating: true,
  isOpenTypeProduct: true,
  searchValue: '',
  categories: [],
  products: [],
  sortedProducts: [],
  selectedProduct: {},
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // loading
    toggleLoading: (state, { payload }) => ({
      ...state,
      loadingCategories: payload,
      loadingProducts: payload,
    }),
    // toast
    toggleToastMessage: (state, { payload }) => ({
      ...state,
      toastMessage: payload,
    }),
    // nav menu
    toggleOpenTypeProduct: (state, { payload }) => ({
      ...state,
      isOpenTypeProduct: payload,
    }),
    // sort rating
    toggleSortRating: (state, { payload }) => ({
      ...state,
      sortRating: payload,
    }),
    // search input
    setSearchValue: (state, { payload }) => ({
      ...state,
      searchValue: payload,
    }),
    // categories
    setCategories: (state, { payload }) => ({
      ...state,
      categories: payload,
    }),
    // products
    setProducts: (state, { payload }) => ({
      ...state,
      products: payload,
    }),
    setSortedProducts: (state, { payload }) => ({
      ...state,
      sortedProducts: payload,
    }),
    // selected product
    setProduct: (state, { payload }) => ({
      ...state,
      selectedProduct: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      // categories
      .addCase(categoryProductsAction.pending, (state) => {
        state.loadingCategories = true;
      })
      .addCase(categoryProductsAction.fulfilled, (state) => {
        state.loadingCategories = false;
      })
      .addCase(categoryProductsAction.rejected, (state) => {
        state.loadingCategories = false;
      })
      // products
      .addCase(productsAction.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(productsAction.fulfilled, (state) => {
        state.loadingProducts = false;
      })
      .addCase(productsAction.rejected, (state) => {
        state.loadingProducts = false;
      })
      // selected product
      .addCase(getSelectedProduct.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getSelectedProduct.fulfilled, (state) => {
        state.loadingProducts = false;
      })
      .addCase(getSelectedProduct.rejected, (state) => {
        state.loadingProducts = false;
      });
  },
});

export const {
  toggleLoading,
  toggleToastMessage,
  toggleOpenTypeProduct,
  toggleSortRating,
  setSearchValue,
  setCategories,
  setProducts,
  setSortedProducts,
  setProduct,
} = loadingSlice.actions;

export const selectLoadingCategories = (state) => state.loading.loadingCategories;

export const selectLoadingProducts = (state) => state.loading.loadingProducts;

export const selectToastMessage = (state) => state.loading.toastMessage;

export const selectOpenTypeProduct = (state) => state.loading.isOpenTypeProduct;

export const selectSortRating = (state) => state.loading.sortRating;

export const selectSearchValue = (state) => state.loading.searchValue;

export const selectCategories = (state) => state.loading.categories;

export const selectProducts = (state) => state.loading.products;

export const selectSortedProducts = (state) => state.loading.sortedProducts;

export const selectProduct = (state) => state.loading.selectedProduct;
