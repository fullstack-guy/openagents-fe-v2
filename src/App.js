import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeSettings } from './theme/Theme';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import "./theme/styles.css";
import { hideNotification } from 'src/store/NotificationSlice';
import Notification from 'src/components/shared/Notification';
import { supabase } from './supabase/supabase';
import { SupabaseContext } from './supabase/SupabaseContext';


function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notificationReducer);
  const [session, setSession] = useState(null)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(hideNotification());
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <SupabaseContext.Provider value={{ session }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
        <Notification
          open={notification.open}
          handleClose={handleClose}
          severity={notification.severity}
          title={notification.title}
          message={notification.message}
        />
      </ThemeProvider>
    </SupabaseContext.Provider>


  );
}

export default App;
