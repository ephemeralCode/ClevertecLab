import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenTypeProduct: true,
  isOpenReviewProduct: false,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    // nav menu
    toggleOpenTypeProduct: (state, { payload }) => ({
      ...state,
      isOpenTypeProduct: payload,
    }),
    toggleOpenReviewProduct: (state, { payload }) => ({
      ...state,
      isOpenReviewProduct: payload,
    }),
  },
});

export const { toggleOpenTypeProduct, toggleOpenReviewProduct } = navigationSlice.actions;

export const selectOpenTypeProduct = (state) => state.navigation.isOpenTypeProduct;

export const selectOpenReviewProduct = (state) => state.navigation.isOpenReviewProduct;
