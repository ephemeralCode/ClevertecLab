import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenTypeProduct: true,
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
  },
});

export const { toggleOpenTypeProduct } = navigationSlice.actions;

export const selectOpenTypeProduct = (state) => state.navigation.isOpenTypeProduct;
