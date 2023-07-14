import React from 'react';
import {Grid} from '@mui/material';

import PageContainer from 'src/components/container/PageContainer';
import ChatWindow from 'src/views/FeedDetails/ChatWindow';

const ChatPage = () => {
    return (
        <PageContainer title="Rumorz - Feed" description="this is feed page">

            <Grid ml={0} container direction="row" overflow="hidden" alignContent="space-between">
                <ChatWindow></ChatWindow>
            </Grid>
        </PageContainer>
    );
};

export default ChatPage;
