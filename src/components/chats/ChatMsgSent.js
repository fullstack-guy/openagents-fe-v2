import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {IconButton, InputBase, Box, TextField} from '@mui/material';
import {IconSend} from '@tabler/icons';
import {sendFeedMessage} from 'src/store/ChatSlice';
import Scrollbar from '../custom-scroll/Scrollbar';
import "src/components/chats/chatsent.css";
import "./chatsent.css"
import {SEND_FEED_MESSAGE} from "../../services/ChatService";

const ChatMsgSent = () => {
    const [msg, setMsg] = React.useState('');
    const dispatch = useDispatch();

    const handleChatMsgChange = (e) => {
        setMsg(e.target.value);
    };

    const session_id = useSelector(
        (state) => state.chatReducer.sessionId
    )

    const onChatMsgSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(SEND_FEED_MESSAGE(session_id, msg));
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
                    onClick={() => {
                        dispatch(SEND_FEED_MESSAGE(session_id, msg));
                        setMsg('');
                    }}
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
