/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const site = 'https://strapi.cleverland.by'

export const categoryProductsAction = createAsyncThunk('categories', async (_, thunkApi) => {
    const result = await axios.get(`${site}/api/categories`)
        .then(res => res)
        // eslint-disable-next-line
        .catch((_) => thunkApi.dispatch(toggleToastMessage(true)))

    if (result.status === 200 && result.data) {
        const arr = [{name: 'Все книги', path: 'all', id: 0}].concat(result.data)
        // eslint-disable-next-line
        thunkApi.dispatch(setCategories(arr))
    }

    return result.data
})

export const productsAction = createAsyncThunk('products', async (_, thunkApi) => {
    const result = await axios.get(`${site}/api/books`)
        .then(res => res)
        // eslint-disable-next-line
        .catch((_) => thunkApi.dispatch(toggleToastMessage(true)))

    if (result.status === 200 && result.data) {
        // eslint-disable-next-line
        thunkApi.dispatch(setProducts(result.data))
    }

    return result.data
})

export const getSelectedProduct = createAsyncThunk('product', async (id, thunkApi) => {
    const result = await axios.get(`${site}/api/books/${id}`)
        .then(res => res)
        // eslint-disable-next-line
        .catch((_) => thunkApi.dispatch(toggleToastMessage(true)))

    if (result.status === 200) {
        // eslint-disable-next-line
        thunkApi.dispatch(setProduct(result.data))
    }

    return result.data
})

const initialState = {
    loadingCategories: false,
    loadingProducts: false,
    toastMessage: false,
    isOpenTypeProduct: true,
    categories: [],
    products: [],
    sortedProducts: [],
    selectedProduct: {}
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        // loading
        toggleLoading: (state, { payload }) => ({
            ...state,
            loadingCategories: payload,
            loadingProducts: payload
        }),
        // toast
        toggleToastMessage: (state, { payload }) => ({
            ...state,
            toastMessage: payload,
        }),
        // nav menu
        toggleOpenTypeProduct: (state, { payload }) => ({
            ...state,
            isOpenTypeProduct: payload,
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
            state.loadingCategories = true
        })
        .addCase(categoryProductsAction.fulfilled, (state) => {
            state.loadingCategories = false
        })
        .addCase(categoryProductsAction.rejected, (state) => {
            state.loadingCategories = false
        })
        // products
        .addCase(productsAction.pending, (state) => {
            state.loadingProducts = true
        })
        .addCase(productsAction.fulfilled, (state) => {
            state.loadingProducts = false
        })
        .addCase(productsAction.rejected, (state) => {
            state.loadingProducts = false
        })
        // selected product
        .addCase(getSelectedProduct.pending, (state) => {
            state.loadingProducts = true
        })
        .addCase(getSelectedProduct.fulfilled, (state) => {
            state.loadingProducts = false
        })
        .addCase(getSelectedProduct.rejected, (state) => {
            state.loadingProducts = false
        })
    },
})

export const { toggleLoading, toggleToastMessage, toggleOpenTypeProduct, setCategories, setProducts, setSortedProducts, setProduct } = loadingSlice.actions

export const selectLoadingCategories = (state) => state.loading.loadingCategories

export const selectLoadingProducts = (state) => state.loading.loadingProducts

export const selectToastMessage = (state) => state.loading.toastMessage

export const selectOpenTypeProduct = (state) => state.loading.isOpenTypeProduct

export const selectCategories = (state) => state.loading.categories

export const selectProducts = (state) => state.loading.products

export const selectSortedProducts = (state) => state.loading.sortedProducts

export const selectProduct = (state) => state.loading.selectedProduct