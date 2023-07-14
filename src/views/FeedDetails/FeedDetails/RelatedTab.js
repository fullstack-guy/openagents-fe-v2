import React from 'react';
import {Grid} from '@mui/material';
import {useSelector} from "react-redux";
import NewsCard from "../../../components/feed/NewsCard";

const FeedRelatedTab = () => {
    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    return (
        <>
            <Grid container spacing={3}>
                {selectedFeed.news.map((news, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <NewsCard news={news} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default FeedRelatedTab;
