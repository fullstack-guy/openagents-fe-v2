import React from 'react';
import {Stack, Typography, Box, Divider} from '@mui/material';
import {IconGridDots} from '@tabler/icons';

const CustomStatistic = ({name, value}) => {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box
                width={38}
                height={38}
                bgcolor="primary.light"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    color="primary.main"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <IconGridDots width={22}/>
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
