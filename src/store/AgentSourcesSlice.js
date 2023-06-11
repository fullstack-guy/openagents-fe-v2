import {filter, map} from 'lodash';
import {createSlice} from '@reduxjs/toolkit';
import axiosServices from 'src/utils/axios';
import {getAgents} from "./AgentSlice";

const initialState = {
    sources: [
    ],
    productSearch: '',
    sortBy: 'newest',
    total: 0,
    filters: {},
    error: ''
};

export const EcommerceSlice = createSlice({
    name: 'agent_sources',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        // GET PRODUCTS
        setAgentSources: (state, action) => {
            state.sources = action.payload;
        },
        SearchProduct: (state, action) => {
            state.productSearch = action.payload;
        },
        setVisibilityFilter: (state, action) => {
            state.currentFilter = action.payload;
        },
        //  SORT  PRODUCTS
        sortByProducts(state, action) {
            state.sortBy = action.payload;
        },
        //  SORT  PRODUCTS
        sortByGender(state, action) {
            state.filters.gender = action.payload.gender;
        },
        //  SORT  By Color
        sortByColor(state, action) {
            state.filters.color = action.payload.color;
        },
        //  SORT  By Color
        sortByPrice(state, action) {
            state.filters.price = action.payload.price;
        },
        //  FILTER PRODUCTS
        filterProducts(state, action) {
            state.filters.category = action.payload.category;
        },
        //  FILTER Reset
        filterReset(state) {
            state.filters.category = 'All';
            state.filters.color = 'All';
            state.filters.gender = 'All';
            state.filters.price = 'All';
            state.sortBy = 'newest';
        },
        // ADD TO CART
        addToCart(state, action) {
            const product = action.payload;
            state.cart = [...state.cart, product];
        },
        // qty increment
        increment(state, action) {
            const productId = action.payload;
            const updateCart = map(state.cart, (product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        qty: product.qty + 1,
                    };
                }
                return product;
            });

            state.cart = updateCart;
        },
        // qty decrement
        decrement(state, action) {
            const productId = action.payload;
            const updateCart = map(state.cart, (product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        qty: product.qty - 1,
                    };
                }
                return product;
            });

            state.cart = updateCart;
        },
        // delete Cart
        deleteCart(state, action) {
            const updateCart = filter(state.cart, (item) => item.id !== action.payload);
            state.cart = updateCart;
        },
    },
});
export const {
    hasError,
    setAgentSources,
    SearchProduct,
    setVisibilityFilter,
    sortByProducts,
    filterProducts,
    sortByGender,
    increment,
    deleteCart,
    decrement,
    addToCart,
    sortByPrice,
    filterReset,
    sortByColor,
} = EcommerceSlice.actions;

export const fetchAgentSources = () => async (dispatch) => {
    try {
        const response = await axiosServices.get('/knowledge-source');
        console.log(response.data)
        dispatch(setAgentSources(response.data.data));
    } catch (error) {
        dispatch(hasError(error));
    }
};



export default EcommerceSlice.reducer;
