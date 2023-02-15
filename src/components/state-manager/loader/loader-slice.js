/* eslint-disable no-param-reassign */
/* eslint-disable import/no-default-export */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { getProductCategories } from "../../../api/api"

export const categoryProductsAction = createAsyncThunk(
    'categories',
    async (data, thunkApi) => {
        const result = await axios.get('https://strapi.cleverland.by/api/categories')
        
        // if (result.ok && result.data) thunkApi.dispatch(setCategories(result.data))
        
        return result.data
    }
)

export const productsAction = createAsyncThunk(
    'products',
    async (data, thunkApi) => {
        const result = await axios.get('https://strapi.cleverland.by/api/books')
        
        return result.data
    }
)

const initialState = {
    loading: false,
    toastMessage: false,
    categories: [],
    products: []
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        // loading
        toggleLoading: (state, { payload }) => ({
            ...state,
            loading: payload,
        }),
        toggleToastMessage: (state, { payload }) => ({
            ...state,
            toastMessage: payload,
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
        })
    },
    extraReducers: builder => {
        builder
            // categories
            .addCase(categoryProductsAction.pending, state => {
                state.loading = true
                state.toastMessage = false
            })
            .addCase(categoryProductsAction.fulfilled, (state, actions) => {
                state.loading = false
                state.toastMessage = false

                state.categories = actions.payload
            })
            .addCase(categoryProductsAction.rejected, state => {
                state.loading = false
                state.toastMessage = true
            })
            // product
            .addCase(productsAction.pending, state => {
                state.loading = true
                state.toastMessage = false
            })
            .addCase(productsAction.fulfilled, (state, actions) => {
                state.loading = false
                state.toastMessage = false

                state.products = actions.payload
            })
            .addCase(productsAction.rejected, state => {
                state.loading = false
                state.toastMessage = true
            })
    }
})

export const { toggleLoading, toggleToastMessage, setCategories, setProducts } = loadingSlice.actions

export const selectLoading = (state) => state.loading.loading

export const selectToastMessage = (state) => state.loading.toastMessage

export const selectCategories = (state) => state.loading.categories

export const selectProducts = (state) => state.loading.products

export default loadingSlice.reducer