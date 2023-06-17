// createSupabaseWrapper.js
import {createClient} from '@supabase/supabase-js';
import {showNotification} from "src/store/NotificationSlice";

const supabase = createClient("https://oqkqnawzusbzzbkxjmgu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3FuYXd6dXNienpia3hqbWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2ODc3NDAsImV4cCI6MjAwMTI2Mzc0MH0.rTAC_c6eJtoDkXalQ-rC4k-nwosCp51YEygpvH7QjGs"
);
const handleSupabaseError = (dispatch, response) => {
    const { error } = response;

    let showNotify = true;
    if (typeof response[response.length - 1] === 'boolean') {
        showNotify = response.pop();
    }

    if (error && showNotify) {
        if (error.code === '42703') {
            dispatch(showNotification({
                severity: 'error',
                title: 'Database Error',
                message: `The requested column does not exist: ${error.message}`
            }));
        } else {
            dispatch(showNotification({
                severity: 'error',
                title: 'Fail',
                message: error.message
            }));
        }
    }

    return response;
};


export { handleSupabaseError, supabase };
