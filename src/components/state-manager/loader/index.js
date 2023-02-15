import { configureStore } from "@reduxjs/toolkit"
import loaderSlice from "./loader-slice"

export const store = configureStore({
    reducer: {
        loading: loaderSlice
    }
})