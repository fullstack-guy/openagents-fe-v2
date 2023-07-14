import React from 'react';
import { Grid } from '@mui/material';
import CustomStatistic from "../../components/shared/CustomStatistic";
import { useSelector } from "react-redux";

const Overview = () => {
    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    const { sentiment, importance, asset_classes } = selectedFeed;

    // Function to find the emotion with the highest value
    const getHighestEmotion = (sentiment) => {
        const emotions = { ...sentiment };
        delete emotions.sentiment; // exclude 'sentiment' field
        return Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
    }

    const stats_list = [
        { name: "importance", value: importance },
        { name: "sentiment", value: sentiment.sentiment },
        { name: "emotion", value: getHighestEmotion(sentiment) },
        { name: "asset_classes", value: asset_classes.join(', ') }
    ];

    return (
        <>
            <Grid container spacing={5}>
                {stats_list.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <CustomStatistic name={titleCase(stat.name)} value={String(stat.value)} />
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
