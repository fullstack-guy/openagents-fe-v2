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
                            <Scrollbar sx={{overflow: 'auto', height: "calc(100vh - 400px)"}}>
                                <Box p={3} height="540px">
                                    {messages && messages?.map((chat, index) => {
                                        return (
                                            <Box key={index}>
                                                <Box mb={1}>
                                                    <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                                                        {chat.created_at ? (
                                                            <Typography variant="body2" color="grey.400" mb={1}>
                                                                ago
                                                            </Typography>
                                                        ) : null}
                                                        {chat.type === 'text' ? (
                                                            <Box
                                                                mb={1}
                                                                key={chat.id}
                                                                sx={{
                                                                    p: 1,
                                                                    backgroundColor: 'primary.light',
                                                                    ml: 'auto',
                                                                    maxWidth: '320px',
                                                                    wordWrap: "break-word"
                                                                }}
                                                            >
                                                                {chat.msg}
                                                            </Box>
                                                        ) : null}
                                                        {chat.type === 'image' ? (
                                                            <Box mb={1} sx={{overflow: 'hidden', lineHeight: '0px'}}>
                                                                <img src={chat.msg} alt="attach" width="250"/>
                                                            </Box>
                                                        ) : null}
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
