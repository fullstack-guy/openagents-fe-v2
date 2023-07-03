import React from 'react';
import { Divider, Box } from '@mui/material';
import ChatContent from 'src/components/chats/ChatContent';
import ChatMsgSent from 'src/components/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const Chats = () => {
  return (
    <AppCard>
      <Box flexGrow={1}>
        <ChatContent />
        <Divider />
        <ChatMsgSent />
      </Box>
    </AppCard>
  );
};

export default Chats;
