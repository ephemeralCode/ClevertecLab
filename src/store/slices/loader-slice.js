/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { urlAPI } from '../../api/api';

export const authorizationUserAction = createAsyncThunk(
  'authorizationUser',
  async ({ identifier, password }, thunkApi) => {
    const result = await axios
      .post(`${urlAPI}/api/auth/local`, {
        identifier,
        password,
      })
      .catch((err) => {
        if (err.response.status === 400 || err?.response?.error?.name === 'ValidationError') {
          thunkApi.dispatch(toggleValidationErrorMessage(true));
        } else {
          thunkApi.dispatch(
            setValidationResult({
              title: 'Вход не выполнен',
              text: 'Что-то пошло не так. Попробуйте ещё раз',
              haveBtn: true,
              textBtn: 'Повторить',
            })
          );
        }
      });

    if (result.status === 200 && result.data.jwt) {
      sessionStorage.setItem('authorization', result.data.jwt);
      const arr = result.data.user;

      thunkApi.dispatch(setUserData(arr));
    }

    return result.data;
  }
);

export const registrationUserAction = createAsyncThunk(
  'registrationUser',
  async ({ username, password, firstName, lastName, email, phone }, thunkApi) => {
    const result = await axios
      .post(`${urlAPI}/api/auth/local/register`, {
        username,
        password,
        firstName,
        lastName,
        email,
        phone,
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 400 || err?.response?.error?.name === 'ValidationError') {
          thunkApi.dispatch(
            setValidationResult({
              title: 'Данные не сохранились',
              text: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
              haveBtn: true,
              textBtn: 'Назад к регистрации',
            })
          );
        } else {
          thunkApi.dispatch(
            setValidationResult({
              title: 'Данные не сохранились',
              text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
              haveBtn: true,
              textBtn: 'Повторить',
            })
          );
        }
      });

    if (result.status === 200 && result.data.jwt) {
      thunkApi.dispatch(
        setValidationResult({
          title: 'Регистрация успешна',
          text: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
          haveBtn: true,
          textBtn: 'Вход',
          action: '/auth',
        })
      );
    }

    return result.data;
  }
);

export const forgotPasswordUserAction = createAsyncThunk('forgotPasswordUser', async ({ email }, thunkApi) => {
  const result = await axios.post(`${urlAPI}/api/auth/forgot-password`, {
    email,
  });

  if (result.status === 200) {
    thunkApi.dispatch(
      setValidationResult({
        title: 'Письмо выслано',
        text: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
      })
    );
  }

  return result.data;
});

export const resetPasswordUserAction = createAsyncThunk(
  'resetPasswordUser',
  async ({ password, passwordConfirmation, code }, thunkApi) => {
    const result = await axios
      .post(`${urlAPI}/api/auth/reset-password`, {
        password,
        passwordConfirmation,
        code,
      })
      .catch((err) => {
        console.log(err);

        thunkApi.dispatch(
          setValidationResult({
            title: 'Данные не сохранились',
            text: 'Что-то пошло не так. Попробуйте ещё раз',
            haveBtn: true,
            textBtn: 'Повторить',
          })
        );
      });

    if (result.status === 200 && result.data.jwt) {
      thunkApi.dispatch(
        setValidationResult({
          title: 'Новые данные сохранены',
          text: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
          haveBtn: true,
          textBtn: 'Вход',
          action: '/auth',
        })
      );
    }

    return result.data;
  }
);

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
  loadingAuthToken: false,
  loadingCategories: false,
  loadingProducts: false,
  toastMessage: false,
  validationErrorMessage: false,
  validationResult: {},
  userData: {},
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
      loadingAuthToken: payload,
      loadingCategories: payload,
      loadingProducts: payload,
    }),
    // toast
    toggleToastMessage: (state, { payload }) => ({
      ...state,
      toastMessage: payload,
    }),
    // user authorization
    toggleValidationErrorMessage: (state, { payload }) => ({
      ...state,
      validationErrorMessage: payload,
    }),
    setValidationResult: (state, { payload }) => ({
      ...state,
      validationResult: payload,
    }),
    // user data
    setUserData: (state, { payload }) => ({
      ...state,
      userData: payload,
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
      })
      // authorization user
      .addCase(authorizationUserAction.pending, (state) => {
        state.loadingAuthToken = true;
      })
      .addCase(authorizationUserAction.fulfilled, (state) => {
        state.loadingAuthToken = false;
      })
      .addCase(authorizationUserAction.rejected, (state) => {
        state.loadingAuthToken = false;
      })
      // registration user
      .addCase(registrationUserAction.pending, (state) => {
        state.loadingAuthToken = true;
      })
      .addCase(registrationUserAction.fulfilled, (state) => {
        state.loadingAuthToken = false;
      })
      .addCase(registrationUserAction.rejected, (state) => {
        state.loadingAuthToken = false;
      })
      // forget password user
      .addCase(forgotPasswordUserAction.pending, (state) => {
        state.loadingAuthToken = true;
      })
      .addCase(forgotPasswordUserAction.fulfilled, (state) => {
        state.loadingAuthToken = false;
      })
      .addCase(forgotPasswordUserAction.rejected, (state) => {
        state.loadingAuthToken = false;
      })
      // reset password user
      .addCase(resetPasswordUserAction.pending, (state) => {
        state.loadingAuthToken = true;
      })
      .addCase(resetPasswordUserAction.fulfilled, (state) => {
        state.loadingAuthToken = false;
      })
      .addCase(resetPasswordUserAction.rejected, (state) => {
        state.loadingAuthToken = false;
      });
  },
});

export const {
  toggleLoading,
  toggleToastMessage,
  toggleValidationErrorMessage,
  setValidationResult,
  setUserData,
  setCategories,
  setProducts,
  setSortedProducts,
  setProduct,
} = loadingSlice.actions;

export const selectLoadingLoadingAuthToken = (state) => state.loading.loadingAuthToken;

export const selectLoadingCategories = (state) => state.loading.loadingCategories;

export const selectLoadingProducts = (state) => state.loading.loadingProducts;

export const selectToastMessage = (state) => state.loading.toastMessage;

export const selectValidationErrorMessage = (state) => state.loading.validationErrorMessage;

export const selectValidationResult = (state) => state.loading.validationResult;

export const selectUserData = (state) => state.loading.userData;

export const selectCategories = (state) => state.loading.categories;

export const selectProducts = (state) => state.loading.products;

export const selectSortedProducts = (state) => state.loading.sortedProducts;

export const selectProduct = (state) => state.loading.selectedProduct;
