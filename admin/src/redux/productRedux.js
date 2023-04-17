import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        success: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        getProductFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //DELETE
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(state.products.findIndex((item) => item._id === action.payload), 1);
        },
        deleteProductFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.success =  false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.success =  true;
            state.products[state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;
        },
        updateProductFail: (state) => {
            state.isFetching = false;
            state.error = true;
            state.success =  false;
        },

        resetMessage: (state) => {
            state.success= false;
            state.error = false;
        },

        //ADD
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.success = true;
            state.products.push(action.payload);
        },
        addProductFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getProductStart,
    getProductSuccess,
    getProductFail,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,
    updateProductStart,
    updateProductSuccess,
    updateProductFail,
    addProductStart,
    addProductSuccess,
    addProductFail,
    resetMessage,
} = productSlice.actions;
export default productSlice.reducer;