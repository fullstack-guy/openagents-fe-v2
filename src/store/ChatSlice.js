import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';

import axios from 'src/utils/axios';
const API_URL = '/api/data/messages';

const initialState = {
  messages: []
};

export const ChatSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getChats: (state, action) => {
      state.messages = action.payload;
    },
    sendMsg: (state, action) => {
      const conversation = action.payload;
      const { id, msg } = conversation;

      const newMessage = {
        id: id,
        msg: msg,
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
  },
});

export const { getChats, sendMsg } = ChatSlice.actions;

export const fetchChats = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getChats(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default ChatSlice.reducer;
