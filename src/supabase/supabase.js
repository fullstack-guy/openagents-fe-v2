// createSupabaseWrapper.js
import { createClient } from '@supabase/supabase-js';
import { showNotification } from "src/store/NotificationSlice";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
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
