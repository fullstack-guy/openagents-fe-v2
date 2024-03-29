import {styled, Container, Box, useTheme} from '@mui/material';
import {useSelector} from 'react-redux';
import {Outlet} from 'react-router-dom';

import Header from '../components/shared/Header/Header';
import Sidebar from '../components/shared/Navbar/Sidebar';
import Customizer from './shared/customizer/Customizer';

const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    zIndex: 1,
    width: '100%',
    background: "transparent",
    height: '100vh'
}));

const FullLayout = () => {
    const customizer = useSelector((state) => state.customizer);

    const theme = useTheme();

    return (
        <MainWrapper
            className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}
        >
            {customizer.isHorizontal ? '' : <Sidebar/>}
            <PageWrapper
                className="page-wrapper"
                sx={{
                    ...(customizer.isCollapse && {
                        [theme.breakpoints.up('lg')]: {ml: `${customizer.MiniSidebarWidth}px`},
                    }),
                }}
            >
                {/* ------------------------------------------- */}
                {/* Header */}
                {/* ------------------------------------------- */}

                {/* --- <Header/> ------------------------------- */}
                {/* ------------------------------------------- */}
                {/* PageContent */}
                {/* ------------------------------------------- */}
                <Container
                    sx={{
                        maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Page Route */}
                    {/* ------------------------------------------- */}
                    <Box>
                        <Outlet/>
                    </Box>
                    {/* ------------------------------------------- */}
                    {/* End Page */}
                    {/* ------------------------------------------- */}
                </Container>
                <Customizer/>
            </PageWrapper>
        </MainWrapper>
    );
};

export default FullLayout;
