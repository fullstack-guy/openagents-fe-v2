import {CssBaseline, ThemeProvider} from '@mui/material';
import {useRoutes} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ThemeSettings} from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import "./theme/styles.css";
import "./App.css"

function App() {
    const routing = useRoutes(Router);
    const theme = ThemeSettings();
    const customizer = useSelector((state) => state.customizer);

    return (

        <ThemeProvider theme={theme}>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>

            <RTL direction={customizer.activeDir}>
                <CssBaseline/>
                <ScrollToTop>{routing}</ScrollToTop>
            </RTL>
        </ThemeProvider>
    );
}

export default App;
