import {useState} from 'react';
import {Box} from '@mui/material';

import NewsFeed from '../../components/feed/LiveNewsFeed';
import {useTheme} from '@mui/material';

const LiveFeeds = () => {

    const theme = useTheme();

    return (
        <Box sx={{
            height: "100vh",
            borderRight: "solid 1px " + theme.palette.divider,
            borderRadius: '0px',
        }}>

                <Box sx={{
                    borderRadius: '0px',
                }}>
                    <Box mt={3}>
                        <NewsFeed/>
                    </Box>
                </Box>

        </Box>

    )
}

export default LiveFeeds
