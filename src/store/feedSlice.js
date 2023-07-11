// feedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFeed: {
    id: null,
    title: "",
    tag: "",
    text: "",
    }
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeed: (state, action) => {
            const { id, title, tag, text } = action.payload
            state.selectedFeed = {
                id,
                title,
                tag,
                text
            }
        },
    },
});

export const {
    setFeed,
} = feedSlice.actions;

export default feedSlice.reducer;
