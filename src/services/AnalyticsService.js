import axiosServices from "../utils/axios";
import {setHomeStats} from "../store/AnalyticsSlice";

export const GET_ANALYTICS_HOME = () => async (dispatch) => {
    try {
        const response = await axiosServices.get('/analytics/home');
        dispatch(setHomeStats(response.data.data));
    } catch (err) {
        throw new Error(err);
    }
};
