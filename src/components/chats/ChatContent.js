import React, {useEffect} from 'react';
import {
    Typography,
    Box,
} from '@mui/material';
import {IconMenu2} from '@tabler/icons';
import {useSelector, useDispatch} from 'react-redux';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import {fetchChats} from 'src/store/ChatSlice';
import {GET_AGENTS} from "../../services/AgentsService";
import {supabase} from "../../supabase/supabase";
import {GET_FEED_MESSAGES} from "../../services/ChatService";

const ChatContent = ({toggleChatSidebar}) => {
    const dispatch = useDispatch()


    const selectedFeed = useSelector(
        (state) => state.feedReducer.selectedFeed
    )
    useEffect(() => {
        if (selectedFeed.id) {
            console.log('selectedFeed.id', selectedFeed.id)
            dispatch(GET_FEED_MESSAGES(selectedFeed.id));
        }
    }, [dispatch, selectedFeed.id]);

    const messages = useSelector(
        (state) => state.chatReducer.messages,
    );
    return (
        <Box>
            {messages ? (
                <Box>

                    <Box display="flex">
                        {/* ------------------------------------------- */}
                        {/* Chat msges */}
                        {/* ------------------------------------------- */}

                        <Box width="100%">
                            <Scrollbar sx={{overflow: 'auto', height: "calc(100vh - 600px)"}}>
                                <Box p={3}>
                                    {messages && messages?.map((chat, index) => {
                                        return (
                                            <Box key={index}>
                                                <Box mb={1}>
                                                    <Box
                                                        display="flex"
                                                        flexDirection={chat.sender === "user" ? 'row-reverse' : 'row'}
                                                    >
                                                        <Box
                                                            mb={1}
                                                            key={chat.message_id}
                                                            sx={{
                                                                p: 2,
                                                                backgroundColor: chat.sender === "user" ? 'primary.dark' : 'primary.light',
                                                                maxWidth: '90%',
                                                                wordWrap: "break-word"
                                                            }}
                                                        >
                                                            {chat.message}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        );
                                    })}
                                </Box>
                            </Scrollbar>
                        </Box>

                        {/* ------------------------------------------- */}
                        {/* Chat right sidebar Content */}
                        {/* ------------------------------------------- */}
                    </Box>
                </Box>
            ) : (
                <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
                    {/* ------------------------------------------- */}
                    {/* if No Chat Content */}
                    {/* ------------------------------------------- */}
                    <Box
                        sx={{
                            display: {xs: 'flex', md: 'flex', lg: 'none'},
                            mr: '10px',
                        }}
                    >
                        <IconMenu2 stroke={1.5} onClick={toggleChatSidebar}/>
                    </Box>
                    <Typography variant="h4">Select Chat</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ChatContent;
