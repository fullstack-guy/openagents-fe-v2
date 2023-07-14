import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {prependFeed} from "../store/feedSlice";

export const GET_LIVE_FEED = () => async (dispatch) => {
    try {
        const response = await supabase.rpc('get_news_feed');
        handleSupabaseError(dispatch, response);
        if (response.data) {
            dispatch(prependFeed(response.data));
        }
    } catch (error) {
        console.log(error);
    }
};
