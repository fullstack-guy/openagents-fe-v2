import React from 'react';
import {Divider, Box} from '@mui/material';
import ChatContent from 'src/components/chats/ChatContent';
import ChatMsgSent from 'src/components/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';
import {useTheme} from '@mui/material';


const ChatWindow = () => {
    const theme = useTheme();
    return (
        <Box flexGrow={1}
             sx={{
                 width:"100%",
                 borderRadius:'0px'
             }}>
            <ChatContent/>
            <ChatMsgSent/>
        </Box>
    );
};

export default ChatWindow;
