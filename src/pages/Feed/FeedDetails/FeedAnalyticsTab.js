import React from 'react';
import {Grid, Typography, Box} from '@mui/material';
import CustomStatistic from "../../../components/shared/CustomStatistic";
import {useSelector} from "react-redux";
import {
    IconAlertTriangle,
    IconMoodAngry,
    IconMoodHappy,
    IconMoodSad,
    IconHeart,
    IconMoodPin,
    IconAlertOctagon,
    IconCoin,
    IconAffiliate,
    IconBookmark
} from '@tabler/icons-react';

const FeedAnalyticsTab = () => {
    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    const {title, sentiment, importance, asset_classes, entities, tags, summary} = selectedFeed;

    const getHighestEmotion = (sentiment) => {
        const emotions = {...sentiment};
        delete emotions.sentiment; // exclude 'sentiment' field
        return Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
    }

    const highestEmotion = getHighestEmotion(sentiment);

    const emotionIconMapping = {
        optimism: <IconMoodHappy/>,
        joy: <IconMoodHappy/>,
        sadness: <IconMoodSad/>,
        anger: <IconMoodAngry/>,
        hate: <IconMoodAngry/>,
        offensive: <IconAlertTriangle/>
    }

    const stats_list = [
        {name: "importance", value: importance, icon: <IconAlertOctagon/>},
        {name: "sentiment", value: sentiment.sentiment, icon: <IconHeart/>},
        {name: "emotion", value: highestEmotion, icon: emotionIconMapping[highestEmotion]},
        {name: "entities", value: entities.join(', '), icon: <IconAffiliate/>},
        {name: "tags", value: tags.join(', '), icon: <IconBookmark/>},
    ];

    return (
        <>
            <Box marginBottom={4}>
                <Typography mb={2} variant="h5" color="white" component="div">{title}</Typography>
                <Typography variant="body1" component="p">{summary}</Typography>
            </Box>
            <Grid container spacing={5}>
                {stats_list.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CustomStatistic
                            name={titleCase(stat.name)}
                            value={String(stat.value)}
                            icon={stat.icon}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default FeedAnalyticsTab;
