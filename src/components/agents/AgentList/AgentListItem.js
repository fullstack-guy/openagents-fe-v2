import React from 'react';
import {
    ListItemText,
    Box,
    Avatar,
    ListItemButton,
    Typography,
    Stack,
    ListItemAvatar,
} from '@mui/material';

import {IconStar, IconTrash} from '@tabler/icons';


const AgentListItem = ({
                           active,
                           onContactClick,
                           agent,
                       }) => {

    return (
        <ListItemButton sx={{mb: 1}} selected={active}>
            <ListItemAvatar>
                <Avatar alt={agent.image} src={agent.image_url}/>
            </ListItemAvatar>
            <ListItemText>
                <Stack direction="row" gap="10px" alignItems="center">
                    <Box mr="auto" onClick={onContactClick}>
                        <Typography variant="subtitle1" noWrap fontWeight={600}>
                            {agent.configs.info.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {agent.role}
                        </Typography>
                    </Box>

                </Stack>
            </ListItemText>
        </ListItemButton>
    );
};


export default AgentListItem;
