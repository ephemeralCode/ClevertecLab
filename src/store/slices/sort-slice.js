import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortRating: true,
  searchValue: '',
};

export const sortSlice = createSlice({
  name: 'sort',
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

export const selectSortRating = (state) => state.loading.sortRating;

export const selectSearchValue = (state) => state.loading.searchValue;
