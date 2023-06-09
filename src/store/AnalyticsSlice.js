import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BACKEND_URL} from "src/configs";

const initialState = {
    home_stats: [],
    status: 'idle',
    error: null,
};

export const AnalyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        getHomeStats: (state, action) => {
            state.home_stats = action.payload;
        },
    },

});

export const { getHomeStats } = AnalyticsSlice.actions;

export const fetchHomeStats = () => async (dispatch) => {
    try {
        const response = await axios.get(BACKEND_URL + '/home');
        dispatch(getHomeStats(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export default AnalyticsSlice.reducer;
