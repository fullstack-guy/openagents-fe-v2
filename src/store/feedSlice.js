// feedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    live_feed:[],
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
        selectFeed: (state, action) => {
            const { id, title, tag, text } = action.payload;
            state.selectedFeed = {
                id,
                title,
                tag,
                text
            }
        },
        appendFeeds: (state, action) => {
            // Adds the feeds at the end of the live_feed array
            action.payload.forEach(feed => {
                state.live_feed.push(feed);
            });
        },
        prependFeeds: (state, action) => {
            // Adds the feeds at the start of the live_feed array
            state.live_feed = [...action.payload, ...state.live_feed];
        },
        resetFeeds: (state) => {
            // Resets the live_feed array to its initial state
            state.live_feed = [];
        },
    },
});


export const {
    selectFeed,
    appendFeeds,
    prependFeeds,
    resetFeeds,
} = feedSlice.actions;

export default feedSlice.reducer;
