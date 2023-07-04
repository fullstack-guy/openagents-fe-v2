import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, InputBase, Box, TextField } from '@mui/material';
import { IconSend } from '@tabler/icons';
import { sendMsg } from 'src/store/ChatSlice';
import Scrollbar from '../custom-scroll/Scrollbar';

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState('');
  const dispatch = useDispatch();

  const id = useSelector((state) => state.chatReducer.chatContent);

  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const newMsg = { id, msg };

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
    <Box p={2} sx={{ height: "100%" }}>
        {/* ------------------------------------------- */}
        {/* sent chat */}
        {/* ------------------------------------------- */}
        <form
          onSubmit={onChatMsgSubmit}
          style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
        >
        <Scrollbar sx={{ maxHeight: "100px", overflow: "auto", width: "100%" }}>
          <TextField
            id="msg-sent"
            autoFocus
            multiline
            fullWidth
            autoComplete="off"
            value={msg}
            placeholder="Chat with your trading agent"
            size="medium"
            inputProps={{ 'aria-label': 'Chat with your trading agent' }}
            onChange={handleChatMsgChange.bind(null)}
            onKeyDown={handleKeyDown}
            // sx={{ height: "100px" }}
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
            <IconSend stroke={1.5} size="20" />
          </IconButton>

        </form>
      </Box>
  );
};

export default ChatMsgSent;
