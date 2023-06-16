import {CssBaseline, ThemeProvider} from '@mui/material';
import {useRoutes} from 'react-router-dom';
import {ThemeSettings} from './theme/Theme';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import "./theme/styles.css";
import {useSelector, useDispatch} from 'react-redux';
import {hideNotification} from 'src/store/NotificationSlice';
import Notification from 'src/components/shared/Notification';
import createSupabaseWrapper from 'src/supabase/supabase';
import {SupabaseContext} from 'src/supabase/SupabaseContext';


function App() {
    const routing = useRoutes(Router);
    const theme = ThemeSettings();
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notificationReducer);
    const supabase = createSupabaseWrapper(
        dispatch,
        "https://oqkqnawzusbzzbkxjmgu.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa3FuYXd6dXNienpia3hqbWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2ODc3NDAsImV4cCI6MjAwMTI2Mzc0MH0.rTAC_c6eJtoDkXalQ-rC4k-nwosCp51YEygpvH7QjGs"
    );

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(hideNotification());
    };
    return (
        <SupabaseContext.Provider value={supabase}>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
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
