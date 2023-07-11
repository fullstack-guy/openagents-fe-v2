import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';

import axios from 'src/utils/axios';

const initialState = {
  messages: [],
  sessionId: null
};

export const ChatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setFeedMessages: (state, action) => {
      state.messages = action.payload;
    },
    addFeedMessage: (state, action) => {
      const response_data = action.payload;
      console.log(response_data);
      const { id, message } = response_data;
      const newMessage = {
        id: id,
        message: message,
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
});

export const { setFeedMessages, addFeedMessage, setSessionId } = ChatSlice.actions;

export default ChatSlice.reducer;
