import React, {useEffect} from 'react';
import {
    Avatar,
    List,
    ListItemText,
    ListItemAvatar,
    TextField,
    Box,
    Alert,
    Badge,
    ListItemButton,
    Typography,
    InputAdornment,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import {selectAgentChat, SearchChat} from 'src/store/ChatSlice';
import {GET_MESSAGES, GET_RECENT_CHAT_SESSIONS} from "src/services/ChatService";
import {last} from 'lodash';
import {IconChevronDown, IconSearch} from '@tabler/icons';


const ChatListing = () => {
    const dispatch = useDispatch();
    const active_chat_session = useSelector((state) => state.chatReducer.selected_chat_id);


    useEffect(() => {
        dispatch(GET_RECENT_CHAT_SESSIONS());
    }, [dispatch]);


    const filterChats = (chats, cSearch) => {
        if (chats)
            return chats.filter((t) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));
        return chats;
    };

    const user_chat_sessions = useSelector((state) =>
        filterChats(state.chatReducer.chat_sessions, state.chatReducer.chatSearch),
    );

    const getDetails = (conversation) => {
        let displayText = '';

        const lastMessage = conversation.messages[conversation.messages.length - 1];
        if (lastMessage) {
            const sender = lastMessage.senderId === conversation.id ? 'You: ' : '';
            const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.msg;
            displayText = `${sender}${message}`;
        }

        return displayText;
    };

    const lastActivity = (chat) => last(chat.messages)?.created_at;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>

            {/* ------------------------------------------- */}
            {/* Search */}
            {/* ------------------------------------------- */}
            <Box px={3} py={1}>
                <TextField
                    id="outlined-search"
                    placeholder="Search contacts"
                    size="small"
                    type="search"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconSearch size={'16'}/>
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                    onChange={(e) => dispatch(SearchChat(e.target.value))}
                />
            </Box>
            {/* ------------------------------------------- */}
            {/* Contact List */}
            {/* ------------------------------------------- */}
            <List sx={{px: 0}}>
                <Box px={2.5} pb={1}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        color="inherit"
                    >
                        Recent Chats <IconChevronDown size="16"/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Sort By Time</MenuItem>
                        <MenuItem onClick={handleClose}>Sort By Unread</MenuItem>
                        <MenuItem onClick={handleClose}>Mark as all Read</MenuItem>
                    </Menu>
                </Box>
                <Scrollbar sx={{height: {lg: 'calc(100vh - 100px)', md: '100vh'}, maxHeight: '600px'}}>
                    {user_chat_sessions && user_chat_sessions.length ? (
                        user_chat_sessions.map((chat_session) => (
                            <ListItemButton
                                key={chat_session.id}
                                onClick={() => dispatch(selectAgentChat(chat_session.id))}
                                sx={{
                                    mb: 0.5,
                                    py: 2,
                                    px: 3,
                                    alignItems: 'start',
                                }}
                                selected={active_chat_session === chat_session.id}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        color={
                                            chat_session.status === 'enabled'
                                                ? 'success'
                                                : chat_session.status === 'disabled'
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
                                        <Avatar alt="Remy Sharp" src={chat_session.image_url}
                                                sx={{width: 42, height: 42}}/>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                                            {chat_session.name}
                                        </Typography>
                                    }
                                    secondary={"Message"}
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                    }}
                                    sx={{my: 0}}
                                />
                            </ListItemButton>
                        ))
                    ) : (
                        <Box m={2}>
                            <Alert severity="error" variant="filled" sx={{color: 'white'}}>
                                No Contacts Found!
                            </Alert>
                        </Box>
                    )}
                </Scrollbar>
            </List>
        </div>
    );
};

export default ChatListing;
