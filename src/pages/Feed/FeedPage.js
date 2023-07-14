import React from 'react';
import {Grid} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import FeedDetails from 'src/views/FeedDetails/FeedDetails/FeedDetails';
import LiveFeeds from 'src/views/LiveFeeds/Main';

const FeedPage = () => {
    return (
        <PageContainer title="Rumorz - Feed" description="this is feed page">

            <Grid ml={0} container direction="row" overflow="hidden" alignContent="space-between">
                <Grid item xs={12} lg={4} style={{overflow: "hidden"}}>
                    <LiveFeeds/>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <FeedDetails/>
                </Grid>

            </Grid>
        </PageContainer>
    );
};

export default FeedPage;
