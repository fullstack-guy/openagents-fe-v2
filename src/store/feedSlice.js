// feedSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    live_feed: [],
    selectedFeed: {

    }
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        selectFeed: (state, action) => {

            state.selectedFeed = action.payload
        },
        selectFeedByID: (state, action) => {
            const feed = state.live_feed.find(feed => feed.id === action.payload);
            if (feed) {
                state.selectedFeed = feed;
            }
            else {
                state.selectedFeed = {};
            }
        },
        appendFeeds: (state, action) => {
            // Adds the feeds at the end of the live_feed array
            action.payload.forEach(feed => {
                state.live_feed.push(feed);
            });
        },
        prependFeed: (state, action) => {
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
    selectFeedByID,
    appendFeeds,
    prependFeed,
    resetFeeds,
} = feedSlice.actions;

export default feedSlice.reducer
