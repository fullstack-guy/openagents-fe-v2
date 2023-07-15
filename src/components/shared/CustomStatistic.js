import React from 'react';
import {Stack, Typography, Box, Divider} from '@mui/material';
import {IconGridDots} from '@tabler/icons';

const CustomStatistic = ({name, value, icon}) => {
    return (
        <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
                width={38}
                height={38}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    backgroundColor: 'primary.light',
                }}
            >
                <Typography
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {icon}
                </Typography>
            </Box>
            <Box>
                <Typography variant="subtitle2" color="textSecondary">
                    {name}
                </Typography>
                <Typography variant="h6" fontWeight="400">
                    {value}
                </Typography>
            </Box>
        </Stack>
    )
}

export default CustomStatistic;
