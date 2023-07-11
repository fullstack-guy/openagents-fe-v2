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
      console.log("Payload ",action.payload)
      state.messages = action.payload;
    },
    sendFeedMessage: (state, action) => {
      const response = action.payload;
      console.log(response.data)
      const { id, message } = response.data[0];

      const newMessage = {
        id: id,
        message: message,
      };
      console.log("Adding message ",newMessage)
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

export const { setFeedMessages, sendFeedMessage, setSessionId } = ChatSlice.actions;

export default ChatSlice.reducer;
