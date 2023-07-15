import React, {useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import {
    Typography,
    Box,
} from '@mui/material';
import {IconMenu2} from '@tabler/icons';
import {useSelector, useDispatch} from 'react-redux';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import {GET_SELECTED_FEED_CHAT} from "../../services/ChatService";

const ChatContent = ({toggleChatSidebar}) => {
    const dispatch = useDispatch()


    const selectedFeed = useSelector(
        (state) => state.feedReducer.selectedFeed
    )

    useEffect(() => {
        if (selectedFeed.id) {
            dispatch(GET_SELECTED_FEED_CHAT(selectedFeed.id));
        }
    }, [dispatch, selectedFeed.id]);

    const messages = useSelector(
        (state) => state.chatReducer.messages,
    );
    return (
        <Box>
            {messages ? (
                    <Box sx={{
                        mt:2
                    }} display="flex">
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
                                                                px: 2,
                                                                backgroundColor: chat.sender === "user" ? 'primary.dark' : 'primary.light',
                                                                maxWidth: '90%',
                                                                wordWrap: "break-word"
                                                            }}
                                                        >
                                                            <ReactMarkdown>{chat.message}</ReactMarkdown>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>

                                        );
                                    })}
                                </Box>
                            </Scrollbar>
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
