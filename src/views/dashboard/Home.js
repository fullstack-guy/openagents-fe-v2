import React from 'react';
import {Box, Grid} from '@mui/material';
import HomeStats from 'src/pages/Home/HomeStats';
import Welcome from 'src/layouts/shared/welcome/Welcome';

const Home = () => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item sm={12} lg={12}>
                    <HomeStats/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
