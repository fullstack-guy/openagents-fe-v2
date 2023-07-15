import React from 'react';
import {Grid} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import FeedDetails from 'src/pages/Feed/FeedDetails/FeedDetails';
import LiveNewsFeed from "../../components/feed/LiveNewsFeed";


const FeedPage = () => {
    return (
        <PageContainer title="Rumorz - Feed" description="Explore live crypto markets">

            <Grid container direction="row" overflow="hidden" spacing={1}>
                <Grid item xs={12} lg={4}>
                    <LiveNewsFeed/>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <FeedDetails
                    />
                </Grid>

            </Grid>
        </PageContainer>
    );
};

export default FeedPage;
