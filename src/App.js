import {CssBaseline, ThemeProvider} from '@mui/material';
import {useRoutes} from 'react-router-dom';
import {ThemeSettings} from './theme/Theme';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import "./theme/styles.css";
import { useSelector, useDispatch } from 'react-redux';
import { hideNotification } from 'src/store/NotificationSlice';
import Notification from 'src/components/shared/Notification';

function App() {
    const routing = useRoutes(Router);
    const theme = ThemeSettings();
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notificationReducer);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(hideNotification());
    };

    return (

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
    );
}

export default App;
