import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import {styled} from '@mui/system';

import FeedCard from "./FeedCard";
import {selectFeedByID, resetFeeds, appendFeeds, prependFeed} from "src/store/feedSlice";
import {useCallback} from "react";
import {GET_LIVE_FEED} from "../../services/LiveFeedService";
import {supabase} from 'src/supabase/supabase';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./Feed.css"
import MultipleValuesAutocomplete from "../forms/form-elements/autoComplete/MultipleValuesAutocomplete";
import Breadcrumb from "../../layouts/shared/breadcrumb/Breadcrumb";
import FormDialog from "src/components/forms/FormDialog";


function truncateWords(text, numWords) {
    const wordsArray = text.split(' ');
    if (wordsArray.length > numWords) {
        return wordsArray.slice(0, numWords).join(' ') + '...';
    } else {
        return text;
    }
}

const CenteredBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    zIndex: 2,
});

const LiveNewsFeed = () => {
    const live_feed = useSelector((state) => state.feedReducer.live_feed);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const [showAutocomplete, setShowAutocomplete] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        dispatch(resetFeeds())
        dispatch(GET_LIVE_FEED())
        setIsLoading(false);
    }, [dispatch])

    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    const handleFeedSelect = useCallback((feed) => {
        console.log("deselecting feed")
        dispatch(selectFeedByID(feed.id))

        if (selectedFeed.id === feed.id) {
            console.log("deselecting feed")
            dispatch(selectFeedByID({'id': null}))
        } else {
        }
    }, [dispatch])


    useEffect(() => {

        const feed = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                {event: '*', schema: 'public', table: 'feed'},
                async (payload) => {
                    console.log('Change received!', payload)

                    const {data: feed, error} = await supabase
                        .rpc('get_feed_card', {feed_id: payload.new.id});

                    if (error) {
                        console.log('Error: ', error);
                    } else {

                        console.log('Received feed: ', feed);
                        dispatch(prependFeed(feed));
                    }

                }
            )
            .subscribe()

    }, []);

    const fetchMoreData = async () => {

    };

    const selectedFeedId = useSelector((state) => state.feedReducer.selectedFeedId);

    return (
        <div style={{
            marginTop:"20px",
        }}>
            <Breadcrumb title="Real-time feed" subtitle="Sit back, read, and trade"/>

            <CenteredBox mt={4}>
                <FormDialog>

                </FormDialog>
                {showAutocomplete &&
                    <Box>
                        <MultipleValuesAutocomplete
                            sx={{
                                width: "10px"
                            }}>
                        </MultipleValuesAutocomplete>
                    </Box>
                }
                <InfiniteScroll
                    style={{height: "100vh"}}
                    dataLength={live_feed.length}
                    next={fetchMoreData}
                    hasMore={true} // should be updated based on whether there are more feeds to load_model
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {live_feed.map((item, i) =>
                        <FeedCard
                            key={i}
                            time={new Date(item.timestamp)}
                            title={item.title}
                            text={truncateWords(item.summary, 25)}
                            onClick={handleFeedSelect}
                            id={item.id}
                            isSelected={selectedFeedId === item.id} // Assuming selectedFeedId is the id of the selected feed
                            tags={item.tags}
                            entities={item.entities}
                        />
                    )}
                </InfiniteScroll>
            </CenteredBox>
        </div>
    )
}

export default LiveNewsFeed;
