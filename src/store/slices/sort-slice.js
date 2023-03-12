import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortRating: true,
  searchValue: '',
};

export const sortSlice = createSlice({
  name: 'sortProducts',
  initialState,
  reducers: {
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
  },
});

export const { toggleSortRating, setSearchValue } = sortSlice.actions;

export const selectSortRating = (state) => state.sortProducts.sortRating;

export const selectSearchValue = (state) => state.sortProducts.searchValue;
