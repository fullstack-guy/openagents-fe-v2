import React from 'react';
import { Grid } from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import ChatDetails from 'src/views/ChatDetails';
import LiveFeeds from 'src/views/LiveFeeds';

const Feed = () => {
  return (
    <PageContainer title="Feed" description="this is feed page">
      <Grid container height="calc(100vh - 64px)" overflow="hidden" alignContent="space-between" spacing={3}>
        <Grid item xs={12} lg={4} height="100%" style={{ overflow: "hidden" }}>
          <LiveFeeds />
        </Grid>
        <Grid item xs={12} lg={8} height="100%">
          <ChatDetails />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Feed;
