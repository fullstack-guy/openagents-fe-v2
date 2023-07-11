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
import { formatDistanceToNowStrict } from 'date-fns';

const FeedCard = ({
  id,
  onClick,
  title,
  text,
  time,
  tag,
  isSelected,
}) => {
  const theme = useTheme();


  return (
    <ListItemButton sx={{
      mb: 2,
      py: 2,
      border: "solid 1px " + theme.palette.divider,
      borderRadius: (theme) => theme.shape.borderRadius / 20,
    }}
      selected={isSelected}
      onClick={() => onClick({
        id,
        title,
        tag,
        text
      })}
      alignItems="flex-start">
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="subtitle2" mb={0.5} fontWeight={500} mr={'auto'}>
            {title}
          </Typography>
          <Chip
            label={tag}
            size="small"
            sx={{
              border: (theme) => `solid 1px ${theme.palette.divider}`,
              color: (theme) => theme.palette.text.secondary,
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          />
        </Stack>
        <Typography variant="subtitle2" width={'100%'} color="text.secondary">
          {text}
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
