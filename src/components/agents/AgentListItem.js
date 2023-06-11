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
                           onContactClick,
                           configs,
                           role,
                           photo_url,
                           image,
                           active,
                       }) => {

    return (
        <ListItemButton sx={{mb: 1}} selected={active}>
            <ListItemAvatar>
                <Avatar alt={image} src={photo_url}/>
            </ListItemAvatar>
            <ListItemText>
                <Stack direction="row" gap="10px" alignItems="center">
                    <Box mr="auto" onClick={onContactClick}>
                        <Typography variant="subtitle1" noWrap fontWeight={600}>
                            {configs.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {role}
                        </Typography>
                    </Box>

                </Stack>
            </ListItemText>
        </ListItemButton>
    );
};


export default AgentListItem;
