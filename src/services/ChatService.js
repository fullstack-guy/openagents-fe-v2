import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {sendFeedMessage, setFeedMessages, setSessionId} from "../store/ChatSlice";

export const GET_FEED_MESSAGES = (feedId) => async (dispatch) => {
    try {
        const response = await supabase
            .rpc('get_messages_or_create_session', {feed_id_input: feedId})
        handleSupabaseError(dispatch, response);
        const messages = response.data.map(item => {
            if (item.current_session_id) {
                dispatch(setSessionId(item.current_session_id));
            }
            return item;
        });
        console.log("MESSAGES", messages)
        dispatch(setFeedMessages(messages));
    } catch (err) {
        throw new Error(err);
    }
};


export const SEND_FEED_MESSAGE = (session_id, message) => async (dispatch) => {
    try {

        const response = await supabase
            .from('feed_chat_messages')
            .insert([
                {
                    session_id: session_id,
                    message: message,
                    sender: 'user'
                },
            ])
            .select()
        handleSupabaseError(dispatch, response);
        dispatch(sendFeedMessage(response.data[0].id, message));

    } catch (err) {
        throw new Error(err);
    }
};

