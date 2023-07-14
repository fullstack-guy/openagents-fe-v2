import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {prependFeed} from "../store/feedSlice";

export const GET_LIVE_FEED = () => async (dispatch) => {
    try {
        const {data, error, status} = await supabase.rpc('get_news_feed');
        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            dispatch(prependFeed(data));
        }
    } catch (error) {
        console.log(error);
    }
};
