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
    sendFeedMessage: (state, action) => {
      const message_data = action.payload;
      const { id, message } = message_data;

      const newMessage = {
        id: id,
        msg: message,
        type: 'text',
        attachments: [],
        createdAt: sub(new Date(), { seconds: 1 }).toString(),
        senderId: uniqueId(),
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

export const { setFeedMessages, sendFeedMessage, setSessionId } = ChatSlice.actions;

export default ChatSlice.reducer;
