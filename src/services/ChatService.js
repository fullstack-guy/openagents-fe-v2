import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {getChats} from "../store/ChatSlice";

export const GET_FEED_MESSAGES = (feedId) => async (dispatch) => {
    try {
        const response = await supabase
            .rpc('get_messages_or_create_session', {feed_id_input: feedId})
        handleSupabaseError(dispatch, response);
        console.log(response.data);
        dispatch(getChats(response.data));
    } catch (err) {
        throw new Error(err);
    }
};
