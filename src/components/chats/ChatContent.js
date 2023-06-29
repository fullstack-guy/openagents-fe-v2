import React, { useEffect } from 'react';
import {
  Typography,
  Divider,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import { IconDotsVertical, IconMenu2, IconPhone, IconVideo } from '@tabler/icons';
import { useSelector, useDispatch } from 'react-redux';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { fetchChats } from 'src/store/ChatSlice';

const ChatContent = ({ toggleChatSidebar }) => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch()

  const messages = useSelector(
    (state) => state.chatReducer.messages,
  );

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <Box>
      {messages ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px',
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <Stack direction={'row'}>
                <IconButton aria-label="delete">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="delete">
                  <IconVideo stroke={1.5} />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}

          <Box display="flex">
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%">
              <Scrollbar sx={{ overflow: 'auto' }} style={{maxHeight: '490px'}} >
                <Box p={3}>
                  {messages && messages?.map((chat) => {
                    return (
                      <Box key={chat.id + chat.msg + chat.createdAt}>
                        <Box mb={1}>
                          <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                            {chat.createdAt ? (
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
                                }}
                              >
                                {chat.msg}
                              </Box>
                            ) : null}
                            {chat.type === 'image' ? (
                              <Box mb={1} sx={{ overflow: 'hidden', lineHeight: '0px' }}>
                                <img src={chat.msg} alt="attach" width="250" />
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
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              mr: '10px',
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <Typography variant="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
