
import { configureStore } from '@reduxjs/toolkit'
import { loadingSlice } from './loader-slice'

export const store = configureStore({
    reducer: {
        loading: loadingSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})