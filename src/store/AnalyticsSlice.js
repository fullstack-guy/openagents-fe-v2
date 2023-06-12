import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    home_stats: [],
    status: 'idle',
    error: null,
};

export const AnalyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setHomeStats: (state, action) => {
            state.home_stats = action.payload;
        },
    },

});

export const {setHomeStats} = AnalyticsSlice.actions;

export default AnalyticsSlice.reducer;
