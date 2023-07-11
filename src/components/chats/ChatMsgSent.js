import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {IconButton, InputBase, Box, TextField} from '@mui/material';
import {IconSend} from '@tabler/icons';
import {addFeedMessage} from 'src/store/ChatSlice';
import Scrollbar from '../custom-scroll/Scrollbar';
import "src/components/chats/chatsent.css";
import "./chatsent.css"
import {handleSupabaseError, supabase} from "../../supabase/supabase";
import axiosServices from "../../utils/axios";
import {hasError, unlinkAgentSource} from "../../store/AgentSourcesSlice";
import {showNotification} from "../../store/NotificationSlice";

const ChatMsgSent = () => {
    const [msg, setMsg] = React.useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    const handleChatMsgChange = (e) => {
        setMsg(e.target.value);
    };

    const session_id = useSelector(
        (state) => state.chatReducer.sessionId
    )

    const onChatMsgSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true)
        try {
            const response = await supabase
                .from('feed_chat_messages')
                .insert([
                    {
                        session_id: session_id,
                        message: e.target.value,
                        sender: 'user'
                    },
                ])
                .select()
            handleSupabaseError(dispatch, response);
            if (response.data) {
                dispatch(addFeedMessage(response.data[0]));
            }

        } catch (err) {
            throw new Error(err);
        }

        try {
            const response = await axiosServices.post(`/chat`,
                {
                    session_id: session_id,
                    message: e.target.value,
                });
            console.log(response.data.data)
            dispatch(addFeedMessage(response.data.data))
        } catch (error) {
            dispatch(showNotification({
                severity: 'error',
                title: 'Fail',
                message: error.response.data.message
            }));
            dispatch(hasError(error));
        }
        setIsLoading(false)
        setMsg('');
    };

    const handleKeyDown = (e) => {
        const key = e.keyCode
        if (key === 13 && !e.shiftKey) {
            onChatMsgSubmit(e)
        }
    }

    return (
        <Box p={2} sx={{height: "100%"}}>
            <form
                onSubmit={onChatMsgSubmit}
                style={{display: 'flex', gap: '10px', alignItems: 'center'}}
            >
                <Scrollbar sx={{
                    paddingLeft: "20px",
                    maxHeight: "100px",
                    overflow: "auto",
                    width: "100%"
                }}>
                    <TextField
                        variant="standard"
                        disabled={isLoading}
                        margin="normal"
                        // <== changed this
                        className="msg-sent"
                        autoFocus
                        multiline
                        fullWidth
                        autoComplete="off"
                        value={msg}
                        placeholder="Chat with your trading agent"
                        size="medium"
                        InputProps={{
                            disableUnderline: true, // <== added this
                        }}
                        inputProps={{
                            'aria-label': 'Chat with your trading agent',
                            border: "none"
                        }}
                        onChange={handleChatMsgChange.bind(null)}
                        onKeyDown={handleKeyDown}
                    />
                </Scrollbar>
                <IconButton
                    aria-label="delete"
                    disabled={!msg}
                    color="primary"
                >
                    <IconSend stroke={1.5} size="20"/>
                </IconButton>

            </form>
        </Box>
    );
};

export default ChatMsgSent;
