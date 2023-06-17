import axiosServices from "../utils/axios";
import {getUserChatSessions} from "../store/ChatSlice";

export const GET_MESSAGES = (chat_session_id) => async (dispatch) => {
    try {
        const response = await axiosServices.get('/message?chat_session_id=' + chat_session_id);
        console.log("Messages", response.data.data)
    } catch (err) {
        throw new Error(err);
    }
};

export const GET_RECENT_CHAT_SESSIONS = () => async (dispatch) => {
    try {
        const response = await axiosServices.get('/chat_session');
        console.log("Chat sessions", response.data.data)
        dispatch(getUserChatSessions(response.data.data));
        // Check if there's at least one chat session
        if (response.data.data.length > 0) {
            // Get the first chat session's ID
            const firstSessionId = response.data.data[0].id;
            // Fetch the session messages
            dispatch(GET_MESSAGES(firstSessionId));
        }
    } catch (err) {
        throw new Error(err);
    }
};
