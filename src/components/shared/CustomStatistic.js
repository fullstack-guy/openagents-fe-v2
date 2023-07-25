import React from 'react';
import {Stack, Typography, Box} from '@mui/material';
import { Avatar, Chip }  from '@mui/material';

const CustomStatistic = ({name, values, icon}) => {
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
                {values.map((value, index) => {
                    let color = 'default';
                    if (value.tag === 'sentiment') {
                        if (['very positive', 'positive'].includes(value.value)) {
                            color = 'success';
                        } else if (['very negative', 'negative'].includes(value.value)) {
                            color = 'error';
                        }
                    }
                    return (
                        <Chip
                            key={index}
                            variant="outlined"
                            avatar={value.tag ? <Avatar>{value.tag[0]}</Avatar> : null}
                            label={value.value}
                            color={color}
                        />
                    );
                })}
            </Box>
        </Stack>
    )
}

export default CustomStatistic;
