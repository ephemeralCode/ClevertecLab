import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenTypeProduct: true,
  isOpenReviewProduct: false,
  typeModalWindowProduct: '',
  idBookingBook: '',
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
    setTypeModalWindowProduct: (state, { payload }) => ({
      ...state,
      typeModalWindowProduct: payload,
    }),
    setIdBookingBook: (state, { payload }) => ({
      ...state,
      idBookingBook: payload,
    }),
  },
});

export const { toggleOpenTypeProduct, toggleOpenReviewProduct, setTypeModalWindowProduct, setIdBookingBook } =
  navigationSlice.actions;

export const selectOpenTypeProduct = (state) => state.navigation.isOpenTypeProduct;

export const selectOpenReviewProduct = (state) => state.navigation.isOpenReviewProduct;

export const selectTypeModalWindowProduct = (state) => state.navigation.typeModalWindowProduct;

export const selectIdBookingBook = (state) => state.navigation.idBookingBook;
