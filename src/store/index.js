import { configureStore } from '@reduxjs/toolkit';

import { loadingSlice } from './slices/loader-slice';
import { navigationSlice } from './slices/navigation-slice';
import { sortSlice } from './slices/sort-slice';

export const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    sort: sortSlice.reducer,
    navifation: navigationSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
