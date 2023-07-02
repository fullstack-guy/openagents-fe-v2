import React  from 'react';
import { Divider, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ChatContent from 'src/components/chats/ChatContent';
import ChatMsgSent from 'src/components/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const Chats = () => {
  return (
    <PageContainer title="Rumorz - Feed" description="this is Chat page">
      <AppCard>
        <Box flexGrow={1}>
          <ChatContent />
          <Divider />
          <ChatMsgSent />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
