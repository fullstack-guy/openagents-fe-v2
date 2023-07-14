import React, { useEffect, useState } from 'react';
import {
  IconButton,
  InputBase,
  Box,
  TextField,
  useTheme,
  Button,
  Grid,
} from '@mui/material';
import { IconSend, IconRecycle } from '@tabler/icons';
import { addFeedMessage } from 'src/store/ChatSlice';
import Scrollbar from '../custom-scroll/Scrollbar';
import "src/components/chats/chatsent.css";
import "./chatsent.css";
import { handleSupabaseError, supabase } from "../../supabase/supabase";
import axiosServices from "../../utils/axios";
import { hasError, unlinkAgentSource } from "../../store/AgentSourcesSlice";
import { showNotification } from "../../store/NotificationSlice";
import { useSelector, useDispatch } from 'react-redux';

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
    'What is Bitcoin',
    'What is Coinbase',
    'Another Question',
  ];

  const onChatMsgSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const response = await supabase
        .from('feed_chat_messages')
        .insert([
          {
            session_id: session_id,
            message: e.target.value,
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
        message: e.target.value,
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
          {suggested_questions.map((question, index) => (
            <Button key={index} variant="outlined" size="small">
              {question}
            </Button>
          ))}
        </Box>
        <Button color='primary' variant="outlined" size="small">
          <IconRecycle /> Reset
        </Button>
      </Box>
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
        <form onSubmit={onChatMsgSubmit} style={{ width: "100%" }}>
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
              disabled={!Number.isFinite(selectedFeed.id)}
              margin="normal"
              className="msg-sent"
              autoFocus
              multiline
              fullWidth
              autoComplete="off"
              value={msg}
              placeholder="Chat with your trading agent"
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
          <IconSend stroke={1.5} size="20" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatMsgSent;
