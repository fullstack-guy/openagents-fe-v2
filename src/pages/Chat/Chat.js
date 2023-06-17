import React, {useState} from 'react';
import {Divider, Box} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ChatSidebar from 'src/components/chats/ChatSidebar';
import ChatContent from 'src/components/chats/ChatContent';
import ChatMsgSent from 'src/components/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const Chats = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <PageContainer title="Open Agents - Chat" description="this is Chat page">
            <AppCard >
                <ChatSidebar
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    onSidebarClose={() => setMobileSidebarOpen(false)}
                />
                <Box display="flex"  sx={{ height: '100vh' }} flexDirection="column" flexGrow={1}>
                    <Box flexGrow={1}>
                        <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)}/>
                    </Box>
                    <ChatMsgSent/>
                </Box>
            </AppCard>
        </PageContainer>
    );
};

export default Chats;
