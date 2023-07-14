import React from 'react';
import {Card, CardContent, Typography, Box, Stack} from '@mui/material';
import moment from 'moment';
import {useSelector} from "react-redux";
import {styled, useTheme} from '@mui/system';

const NewsCard = ({news}) => {
    const timeAgo = moment(news.timestamp).fromNow();
    const customizer = useSelector((state) => state.customizer);
    const theme = useTheme();

    const NewsCardStyled = styled(Card)(() => ({
        padding: '5px 10px',
        display: 'flex', p: 0,
        width: '100%', height: 'auto',
        gap: '10px',
        borderRadius: `${customizer.borderRadius}px`,
        '&:hover': {
            border: "solid 1px " + theme.palette.grey[200],
            cursor: 'pointer',
        }
    }));

    const handleCardClick = () => {
        window.open(news.url, '_blank');
    };

    return (
        <NewsCardStyled
            onClick={handleCardClick}
            elevation={customizer.isCardShadow ? 9 : 0}
            variant={!customizer.isCardShadow ? 'outlined' : undefined}
        >
            <CardContent>
                <Stack direction="column" spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption">
                            {news.source}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {timeAgo}
                        </Typography>
                    </Stack>
                    <Typography variant="body1">
                        {news.title}
                    </Typography>
                </Stack>
            </CardContent>
        </NewsCardStyled>
    );
};

export default NewsCard;
