// createSupabaseWrapper.js
import { createClient } from '@supabase/supabase-js';
import { showNotification } from "src/store/NotificationSlice";

const createSupabaseWrapper = (dispatch, url, key) => {
    const supabase = createClient(url, key);

    return new Proxy(supabase, {
        get: function(target, prop, receiver) {
            const original = target[prop];

            if (typeof original === 'function') {
                return function(...args) {
                    // Return original function if it's a chaining method like 'from'
                    if (['from'].includes(prop)) {
                        return original.apply(this, args);
                    }

                    return async function(...args) {
                        let showNotify = true;
                        if (typeof args[args.length - 1] === 'boolean') {
                            showNotify = args.pop();
                        }

                        try {
                            const result = await original.apply(this, args);
                            // console.log("Supabase wrapper", result);

                            if (result.error && showNotify) {
                                dispatch(showNotification({
                                    severity: 'error',
                                    title: 'Fail',
                                    message: result.error.message
                                }));
                            }

                            return result;
                        } catch (error) {
                            if (showNotify) {
                                dispatch(showNotification({
                                    severity: 'error',
                                    title: 'Fail',
                                    message: error.message
                                }));
                            }
                            throw error;
                        }
                    }.apply(this, args)
                }
            }

            return original;
        }
    });
};

export default createSupabaseWrapper;
