// notificationSlice.js
import {createSlice} from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        open: false,
        severity: 'info',
        title: '',
        message: ''
    },
    reducers: {
        showNotification: (state, action) => {
            state.open = true;
            state.severity = action.payload.severity;
            state.title = action.payload.title;
            state.message = action.payload.message;
        },
        hideNotification: (state) => {
            state.open = false;
        },
    },
});

export const {
    showNotification,
    hideNotification
} = notificationSlice.actions;

export default notificationSlice.reducer;
