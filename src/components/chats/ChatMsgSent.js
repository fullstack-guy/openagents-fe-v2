import React, {useEffect, useState} from 'react';
import {
    IconButton,
    InputBase,
    Box,
    TextField,
    useTheme,
    Button,
    Grid,
} from '@mui/material';
import {IconSend, IconRecycle} from '@tabler/icons';
import {addFeedMessage, resetFeedMessages} from 'src/store/ChatSlice';
import Scrollbar from '../custom-scroll/Scrollbar';
import "src/components/chats/chatsent.css";
import "./chatsent.css";
import {handleSupabaseError, supabase} from "../../supabase/supabase";
import axiosServices from "../../utils/axios";
import {hasError, unlinkAgentSource} from "../../store/AgentSourcesSlice";
import {showNotification} from "../../store/NotificationSlice";
import {useSelector, useDispatch} from 'react-redux';
import ChatToolbar from './ChatToolbar';

const ChatMsgSent = () => {
    const [msg, setMsg] = React.useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleChatMsgChange = (e) => {
        setMsg(e.target.value);
    };

    const session_id = useSelector((state) => state.chatReducer.sessionId);
    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    const suggested_questions = [
        'Suggestion 1',
        'Suggestion 2',
        'Suggestion 3',
    ];

    const feed_messages = useSelector(
        (state) => state.chatReducer.messages
    );

    const handleSuggestedQuestionClick = async (e) => {
        const suggestion = e.target.innerText;
        setMsg(suggestion);
        onChatMsgSubmit(e, suggestion);
    };

    const onResetClick = async (e) => {
        if (feed_messages.length > 0 && e.target.tagName.toLowerCase() === "button" && e.target.textContent.trim() === "Reset") {
            dispatch(resetFeedMessages())
            try {
                const response = await supabase
                    .from('feed_chat_messages')
                    .delete()
                    .eq('session_id', session_id);
                handleSupabaseError(dispatch, response)
                if (response.error) {
                    // Handle the error if necessary
                }
            } catch (err) {
                // Handle the error if necessary
            }
        }
        setIsLoading(false);
        setMsg('');
    };

    const onChatMsgSubmit = async (e, suggestion = null) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        console.log("suggestion", suggestion)
        const chatMsg = suggestion ? suggestion : msg;

        try {
            const response = await supabase
                .from('feed_chat_messages')
                .insert([
                    {
                        session_id: session_id,
                        message: chatMsg,
                        sender: 'user',
                    },
                ])
                .select();

            handleSupabaseError(dispatch, response);
            if (response.data) {
                dispatch(addFeedMessage(response.data[0]));
            }
        } catch (err) {
            throw new Error(err);
        }

        try {
            const response = await axiosServices.post(`/chat`, {
                session_id: session_id,
                feed_id: selectedFeed.id,
                message: chatMsg,
                related_news: selectedFeed.news,
            });
            dispatch(addFeedMessage(response.data.data));
        } catch (error) {
            dispatch(showNotification({
                severity: 'error',
                title: 'Fail',
                message: error.response.data.message,
            }));
            dispatch(hasError(error));
        }
        setIsLoading(false);
        setMsg('');
    };

    const handleKeyDown = (e) => {
        const key = e.keyCode;
        if (key === 13 && !e.shiftKey) {
            onChatMsgSubmit(e);
        }
    };

    const theme = useTheme();

    return (
        <Box p={2} mb={2}>
            <ChatToolbar
                selectedFeed={selectedFeed}
                session_id={session_id}
                setIsLoading={setIsLoading}
            />

            <Box
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="5px"
                mt={3}
                sx={{
                    border: "solid 1px " + theme.palette.divider,
                }}
            >
                <form onSubmit={onChatMsgSubmit} style={{width: "100%"}}>
                    <Scrollbar
                        sx={{
                            paddingLeft: "20px",
                            maxHeight: "100px",
                            overflow: "auto",
                            width: "100%",
                        }}
                    >
                        <TextField
                            variant="standard"
                            disabled={!Number.isFinite(selectedFeed.id) || isLoading}
                            margin="normal"
                            className="msg-sent"
                            autoFocus
                            multiline
                            fullWidth
                            autoComplete="off"
                            value={msg}
                            placeholder="Chat"
                            size="medium"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            inputProps={{
                                'aria-label': 'Chat with your trading agent',
                                border: "none",
                            }}
                            onChange={handleChatMsgChange}
                            onKeyDown={handleKeyDown}
                        />
                    </Scrollbar>
                </form>
                <IconButton
                    aria-label="delete"
                    disabled={!msg}
                    color="primary"
                >
                    <IconSend stroke={1.5} size="20"/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatMsgSent;
