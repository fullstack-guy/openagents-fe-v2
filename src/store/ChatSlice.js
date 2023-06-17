import {createSlice} from '@reduxjs/toolkit';
import {uniqueId} from 'lodash';
import {sub} from 'date-fns';
import {ChatData} from "src/_mockApis/Chatdata"
import axiosServices from "src/utils/axios";


const initialState = {
    session_messages: [],
    chat_sessions: [],
    selected_agent_chat_id: 1,
    chatSearch: '',
};

export const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getUserChatSessions: (state, action) => {
            state.chat_sessions = action.payload;
        },
        selectAgentSession: (state, action) => {
            state.selected_agent_chat_id = action.payload;
        },
        SearchChat: (state, action) => {
            state.session_messagesearch = action.payload;
        },
        selectAgentChat: (state, action) => {
            state.selected_chat_id = action.payload;
        },
        sendMessageState: (state, action) => {
            const conversation = action.payload;
            const {id, msg} = conversation;

            const newMessage = {
                id: id,
                message: msg,
                type: 'text',
                attachments: [],
                created_at: sub(new Date(), {seconds: 1}),
                sender_id: uniqueId(),
            };

            state.session_messages = state.session_messages.map((chat) =>
                chat.id === action.payload.id
                    ? {
                        ...chat,
                        ...chat.messages.push(newMessage),
                    }
                    : chat,
            );
        },
    },
});

export const {
    SearchChat,
    sendMsg,
    selectAgentChat,
    getUserChatSessions,
} = ChatSlice.actions;



export default ChatSlice.reducer;
