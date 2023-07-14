import {createSlice} from '@reduxjs/toolkit';
import {uniqueId} from 'lodash';
import {sub} from 'date-fns';

import axios from 'src/utils/axios';

const initialState = {
    messages: [],
    sessionId: null
};

export const ChatSlice = createSlice({
        name: 'messages',
        initialState,
        reducers: {
            resetFeedMessages: (state, action) => {
                state.messages = [];
            },
            setFeedMessages: (state, action) => {
                console.log("Setting feed messages ", action.payload)
                state.messages = action.payload;
            },
            addFeedMessage: (state, action) => {
                const response_data = action.payload;
                console.log("Response data", response_data);
                const {id, message, sender} = response_data;
                const newMessage = {
                    id: id,
                    message: message,
                    sender: sender
                };
                state.messages = [
                    ...state.messages,
                    newMessage
                ]
            },
            setSessionId: (state, action) => {
                state.sessionId = action.payload;
            }
        },
    })
;

export const {resetFeedMessages, setFeedMessages, addFeedMessage, setSessionId} = ChatSlice.actions;

export default ChatSlice.reducer;
