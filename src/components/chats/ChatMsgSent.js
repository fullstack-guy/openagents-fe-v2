import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {IconButton, InputBase, Box, TextField} from '@mui/material';
import {IconSend} from '@tabler/icons';
import {sendMsg} from 'src/store/ChatSlice';
import Scrollbar from '../custom-scroll/Scrollbar';
import "src/components/chats/chatsent.css";
import "./chatsent.css"

const ChatMsgSent = () => {
    const [msg, setMsg] = React.useState('');
    const dispatch = useDispatch();

    const id = useSelector((state) => state.chatReducer.chatContent);

    const handleChatMsgChange = (e) => {
        setMsg(e.target.value);
    };

    const newMsg = {id, msg};

    const onChatMsgSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(sendMsg(newMsg));
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
                        dispatch(sendMsg(newMsg));
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
