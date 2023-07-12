import {handleSupabaseError, supabase} from 'src/supabase/supabase';
import {prependFeeds} from "../store/feedSlice";

export const GET_LIVE_FEED = () => async (dispatch) => {
    try {
        const {data, error, status} = await supabase.from('feed').select(`*`);
        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            dispatch(prependFeeds(data));
        }
    } catch (error) {
        console.log(error);
    }
};
