import React from 'react';
import {Grid, Typography, Box} from '@mui/material';
import CustomStatistic from "../../components/shared/CustomStatistic";
import {useSelector} from "react-redux";
import {IconHearts, IconMoodPin, IconAlertOctagon, IconCoin, IconAffiliate, IconBookmark} from '@tabler/icons-react';

const Overview = () => {
    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    const {sentiment, importance, asset_classes, entities, tags, summary} = selectedFeed;

    // Function to find the emotion with the highest value
    const getHighestEmotion = (sentiment) => {
        const emotions = {...sentiment};
        delete emotions.sentiment; // exclude 'sentiment' field
        return Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
    }

    const stats_list = [
        {name: "importance", value: importance, icon: <IconAlertOctagon/>},
        {name: "sentiment", value: sentiment.sentiment, icon: <IconHearts/>},
        {name: "emotion", value: getHighestEmotion(sentiment), icon: <IconMoodPin/>},
        {name: "asset_classes", value: asset_classes.join(', '), icon: <IconCoin/>},
        {name: "entities", value: entities.join(', '), icon: <IconAffiliate/>},
        {name: "tags", value: tags.join(', '), icon: <IconBookmark/>},
    ];

    return (
        <>
            <Box marginBottom={4}>
                <Typography variant="subtitle2" color="textSecondary" component="div">Summary</Typography>
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

// Function to capitalize the first letter of each word in a string
function titleCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default Overview;
