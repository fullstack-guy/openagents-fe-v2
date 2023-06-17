import React from 'react';
import {
    Typography,
    Divider,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton,
    Box,
    Stack,
    Badge,
    useMediaQuery,
} from '@mui/material';
import {IconDotsVertical, IconMenu2, IconPhone, IconVideo} from '@tabler/icons';
import {useSelector} from 'react-redux';

import {formatDistanceToNowStrict} from 'date-fns';
import ChatInsideSidebar from './ChatInsideSidebar';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

const ChatContent = ({toggleChatSidebar}) => {
    const [open, setOpen] = React.useState(true);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const chatDetails = useSelector(
        (state) => state.chatReducer.session_messages[state.chatReducer.selected_chat_id - 1],
    );

    return (
        <Box>
            {chatDetails ? (
                <Box>
                    {/* ------------------------------------------- */}
                    {/* Header Part */}
                    {/* ------------------------------------------- */}
                    <Box>
                        <Box display="flex" alignItems="center" p={2}>
                            <Box
                                sx={{
                                    display: {xs: 'block', md: 'block', lg: 'none'},
                                    mr: '10px',
                                }}
                            >
                                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar}/>
                            </Box>
                            <ListItem key={chatDetails.id} dense disableGutters>
                                <ListItemAvatar>
                                    <Badge
                                        color={
                                            chatDetails.status === 'enabled'
                                                ? 'success'
                                                : chatDetails.status === 'disabled'
                                                    ? 'warning'
                                                    : 'error'
                                        }
                                        variant="dot"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        overlap="circular"
                                    >
                                        <Avatar alt={chatDetails.name} src={chatDetails.image_url}/>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="h5">{chatDetails.name}</Typography>}
                                    secondary={chatDetails.status === "enabled" ? "online" : "offline"}
                                />
                            </ListItem>
                        </Box>
                        <Divider/>
                    </Box>
                    {/* ------------------------------------------- */}
                    {/* Chat Content */}
                    {/* ------------------------------------------- */}

                    <Box display="flex">
                        {/* ------------------------------------------- */}
                        {/* Chat msges */}
                        {/* ------------------------------------------- */}

                        <Box width="100%">
                            <Scrollbar sx={{height: '650px', overflow: 'auto', maxHeight: '800px'}}>
                                <Box p={3}>
                                    {chatDetails.messages.map((chat) => {
                                        return (
                                            <Box key={chat.id + chat.msg + chat.created_at}>
                                                {chatDetails.id === chat.senderId ? (
                                                    <>
                                                        <Box display="flex">
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt={chatDetails.name}
                                                                    src={chatDetails.image_url}
                                                                    sx={{width: 40, height: 40}}
                                                                />
                                                            </ListItemAvatar>
                                                            <Box>
                                                                {chat.created_at ? (
                                                                    <></>
                                                                ) : null}
                                                                {chat.type === 'text' ? (
                                                                    <Box
                                                                        mb={2}
                                                                        sx={{
                                                                            p: 2,
                                                                            backgroundColor: 'grey.100',
                                                                            mr: 'auto',
                                                                            maxWidth: '320px',
                                                                        }}
                                                                    >
                                                                        {chat.msg}
                                                                    </Box>
                                                                ) : null}
                                                                {chat.type === 'image' ? (
                                                                    <Box mb={1}
                                                                         sx={{overflow: 'hidden', lineHeight: '0px'}}>
                                                                        <img src={chat.msg} alt="attach" width="150"/>
                                                                    </Box>
                                                                ) : null}
                                                            </Box>
                                                        </Box>
                                                    </>
                                                ) : (
                                                    <Box
                                                        mb={1}
                                                        display="flex"
                                                        alignItems="flex-end"
                                                        flexDirection="row-reverse"
                                                    >
                                                        <Box alignItems="flex-end" display="flex"
                                                             flexDirection={'column'}>
                                                            {chat.type === 'text' ? (
                                                                <Box
                                                                    mb={1}
                                                                    key={chat.id}
                                                                    sx={{
                                                                        p: 2,
                                                                        backgroundColor: 'third.main',
                                                                        ml: 'auto',
                                                                        maxWidth: '320px',
                                                                    }}
                                                                >
                                                                    {chat.msg}
                                                                </Box>
                                                            ) : null}
                                                            {chat.type === 'image' ? (
                                                                <Box mb={1}
                                                                     sx={{overflow: 'hidden', lineHeight: '0px'}}>
                                                                    <img src={chat.msg} alt="attach" width="250"/>
                                                                </Box>
                                                            ) : null}
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Scrollbar>
                        </Box>

                        {/* ------------------------------------------- */}
                        {/* Chat right sidebar Content */}
                        {/* -- <ChatInsideSidebar isInSidebar={lgUp ? open : !open} chat={chatDetails} />----------------------------------------- */}

                    </Box>
                </Box>
            ) : (
                <Box sx={{
                    height: "100px",
                }} display="flex" alignItems="center" p={2} pb={1} pt={1}>
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
                    <Typography variant="h4">No conversation selected</Typography>
                </Box>
            )}
        </Box>
    );
};

export default ChatContent;
