import React, {useCallback} from 'react';
import {useMediaQuery, Button, Box, Drawer, useTheme, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import SidebarItems from './SidebarItems';
import Logo from 'src/layouts/shared/logo/Logo';
import {hoverSidebar, toggleMobileSidebar} from 'src/store/CustomizerSlice';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import {supabase} from 'src/supabase/supabase';
import {useSupabaseContext} from 'src/supabase/SupabaseContext';

const Sidebar = () => {
    const {session} = useSupabaseContext()
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const customizer = useSelector((state) => state.customizer);
    const dispatch = useDispatch();
    const theme = useTheme();
    const toggleWidth =
        customizer.isCollapse && !customizer.isSidebarHover
            ? customizer.MiniSidebarWidth
            : customizer.SidebarWidth;

    const onHoverEnter = () => {
        if (customizer.isCollapse) {
            dispatch(hoverSidebar(true));
        }
    };

    const onHoverLeave = () => {
        dispatch(hoverSidebar(false));
    };

    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut()
    }, [])

    if (lgUp) {
        return (
            <Box
                sx={{
                    width: toggleWidth,
                    flexShrink: 0,
                    ...(customizer.isCollapse && {
                        position: 'absolute',
                    }),
                }}
            >
                {/* ------------------------------------------- */}
                {/* Sidebar for desktop */}
                {/* ------------------------------------------- */}
                <Drawer
                    anchor="left"
                    open
                    onMouseEnter={onHoverEnter}
                    onMouseLeave={onHoverLeave}
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            transition: theme.transitions.create('width', {
                                duration: theme.transitions.duration.shortest,
                            }),
                            width: toggleWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Sidebar Box */}
                    {/* ------------------------------------------- */}
                    <Box
                        sx={{
                            height: '100%',
                        }}
                    >
                        {/* ------------------------------------------- */}
                        {/* Logo */}
                        {/* ------------------------------------------- */}
                        <Box p={3}>
                            <Typography variant="h6">Rumorz</Typography>
                            {/* //<Logo />--------------------- */}
                        </Box>
                        <Scrollbar sx={{height: 'calc(100% - 190px)'}}>
                            {/* ------------------------------------------- */}
                            {/* Sidebar Items */}
                            {/* ------------------------------------------- */}
                            <SidebarItems/>
                        </Scrollbar>
                    </Box>
                    {session && <Box mt={1} py={1} px={2}>
                        <Button onClick={handleLogout} variant="outlined" color="primary" component={Link} fullWidth>
                            Logout
                        </Button>
                    </Box>}
                </Drawer>
            </Box>
        );
    }

    return (
        <Drawer
            anchor="left"
            open={customizer.isMobileSidebar}
            onClose={() => dispatch(toggleMobileSidebar())}
            variant="temporary"
            PaperProps={{
                sx: {
                    width: customizer.SidebarWidth,
                    backgroundColor:
                        customizer.activeMode === 'dark'
                            ? customizer.darkBackground900
                            : customizer.activeSidebarBg,
                    color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
                    border: '0 !important',
                    boxShadow: (theme) => theme.shadows[8],
                },
            }}
        >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* -----<Logo/>-------------------------------------- */}
            <Box px={2} >
                <Typography variant="h4">Rumorz</Typography>
            </Box>
            {/* ------------------------------------------- */}
            {/* Sidebar For Mobile */}
            {/* ------------------------------------------- */}
            <SidebarItems/>
        </Drawer>
    );
};

export default Sidebar;
