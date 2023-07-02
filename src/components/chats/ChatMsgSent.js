import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, InputBase, Box, Popover } from '@mui/material';
import Picker from 'emoji-picker-react';
import { IconMoodSmile, IconPaperclip, IconPhoto, IconSend } from '@tabler/icons';
import { sendMsg } from 'src/store/ChatSlice';

const ChatMsgSent = () => {
  const [msg, setMsg] = React.useState('');
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chosenEmoji, setChosenEmoji] = React.useState();

  const onEmojiClick = (_event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMsg(emojiObject.emoji);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <Box p={2}>
      {/* ------------------------------------------- */}
      {/* sent chat */}
      {/* ------------------------------------------- */}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
      >

        <InputBase
          id="msg-sent"
          autoFocus
          fullWidth
          value={msg}
          placeholder="Chat with your trading agent"
          size="small"
          type="text"
          inputProps={{ 'aria-label': 'Chat with your trading agent' }}
          onChange={handleChatMsgChange.bind(null)}
        />
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
