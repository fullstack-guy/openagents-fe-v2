import React from 'react';
import {
    ListItemText,
    ListItemIcon,
    Chip,
    ListItemButton,
    Typography,
    Stack,
    useTheme,
    Box
} from '@mui/material';
import {formatDistanceToNowStrict} from 'date-fns';

const FeedCard = (props) => {
    const theme = useTheme();

    const {
        id,
        onClick,
        title,
        time,
        isSelected,
        tags,
        entities,
    } = props;

    return (
        <ListItemButton
            sx={{
                py: 3,
                borderTop: "solid 1px " + theme.palette.divider,
            }}
            selected={isSelected}
            onClick={() => onClick(props)}
            alignItems="flex-start"
        >
            <ListItemText>
                <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkit-line-clamp": 2,
                        "-webkit-box-orient": "vertical",
                        fontWeight: 500,
                        mr: "auto"
                    }}
                >
                    {title}
                </Typography>
                <Stack direction="row" mt={3} gap="10px" alignItems="center">
                    {[...tags].map((item, index) =>
                        <Chip
                            key={index}
                            label={item}
                            size="small"
                            sx={{
                                border: (theme) => `solid 1px ${theme.palette.divider}`,
                                color: (theme) => theme.palette.text.secondary,
                                backgroundColor: (theme) => theme.palette.background.paper,
                                maxWidth: "70%",
                            }}
                        />
                    )}
                    <Typography
                        variant="caption"
                        noWrap
                        sx={{
                            ml: 'auto',
                            color: (theme) => theme.palette.text.secondary,
                            maxWidth: '30%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                        {formatDistanceToNowStrict(new Date(time), {
                            addSuffix: false,
                        })}{' '}
                        ago
                    </Typography>
                </Stack>
            </ListItemText>
        </ListItemButton>
    );
};

export default FeedCard;
