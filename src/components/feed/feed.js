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
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import {IconAlertCircle, IconStar, IconTrash} from '@tabler/icons';
import {formatDistanceToNowStrict} from 'date-fns';

const FeedCard = ({
                      id,
                      onClick,
                      title,
                      subject,
                      time,
                      label,
                      isSelected,
                  }) => {
    const theme = useTheme();

    const warningColor = theme.palette.warning.main;
    const errorColor = theme.palette.error.light;

    return (
        <ListItemButton sx={{
            mb: 1,
            py: 2,
            border: "solid 1px " + theme.palette.divider,
            borderRadius: (theme) => theme.shape.borderRadius / 20,
        }}
                        selected={isSelected}
                        alignItems="flex-start">
            <ListItemText onClick={onClick}>
                <Stack direction="row" gap="10px" alignItems="center">
                    <Typography variant="subtitle2" mb={0.5} fontWeight={500} mr={'auto'}>
                        {title}
                    </Typography>
                    <Chip
                        label={label}
                        size="small"
                        color={label === 'Promotional' ? 'primary' : label === 'Social' ? 'error' : 'success'}
                    />
                </Stack>
                <Typography variant="subtitle2" width={'100%'} color="text.secondary">
                    {subject}
                </Typography>
                {/* ------------------------------------------- */}
                {/* Email page */}
                {/* ------------------------------------------- */}
                <Stack direction="row" mt={1} gap="10px" alignItems="center">
                    {/* ------------------------------------------- */}
                    {/* Checked ? */}
                    {/* ------------------------------------------- */}
                    <Typography
                        variant="caption"
                        noWrap
                        sx={{
                            ml: 'auto',
                            color: ''
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
