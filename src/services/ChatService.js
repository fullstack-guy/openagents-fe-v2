import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {addFeedMessage, setFeedMessages, setSessionId} from "../store/ChatSlice";

export const GET_FEED_MESSAGES = (feedId) => async (dispatch) => {
    try {
        const response = await supabase
            .rpc('get_feed_messages_with_session', {feed_id_input: feedId})
        handleSupabaseError(dispatch, response);
        const messages = response.data.map(item => {
            if (item.current_session_id) {
            }
            return item;
        });
        dispatch(setSessionId(response.data[0].current_session_id));
        dispatch(setFeedMessages(response.data));

    } catch (err) {
        throw new Error(err);
    }
};
