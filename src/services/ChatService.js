import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {addFeedMessage, setFeedMessages, setSessionId} from "../store/ChatSlice";

export const GET_SELECTED_FEED_CHAT = (feedId) => async (dispatch) => {
    try {
        const response = await supabase
            .rpc('get_feed_messages_with_session', {feed_id_input: feedId})
        handleSupabaseError(dispatch, response);
        if (response.data) {
            dispatch(setSessionId(response.data[0].current_session_id));
            if (response.data[0].message !== null) {
                dispatch(setFeedMessages(response.data));
            } else if (response.data[0].message === null | response.data[0].message === undefined | response.data.length === 0) {
                dispatch(setFeedMessages([]));
            }
        }

    } catch (err) {
        throw new Error(err);
    }
};
