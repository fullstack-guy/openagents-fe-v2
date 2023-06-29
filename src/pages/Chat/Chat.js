import React, { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from 'src/layouts/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import ChatContent from 'src/components/chats/ChatContent';
import ChatMsgSent from 'src/components/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const Chats = () => {
  return (
    <PageContainer title="Chat ui" description="this is Chat page">
      <Breadcrumb title="Chat app" subtitle="Messenger" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}

        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}

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
