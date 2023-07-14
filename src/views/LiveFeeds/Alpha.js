import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress} from "@mui/material";

import FeedCard from "../../components/feed/FeedCard";
import {selectFeedByID, resetFeeds, appendFeeds, prependFeed} from "src/store/feedSlice";
import {useCallback} from "react";
import {GET_LIVE_FEED} from "../../services/LiveFeedService";
import {supabase} from 'src/supabase/supabase';
import InfiniteScroll from 'react-infinite-scroll-component';
import {GET_SELECTED_FEED_CHAT} from "../../services/ChatService";

function truncateWords(text, numWords) {
    const wordsArray = text.split(' ');
    if (wordsArray.length > numWords) {
        return wordsArray.slice(0, numWords).join(' ') + '...';
    } else {
        return text;
    }
}

const ThemeTab = () => {
    const live_feed = useSelector((state) => state.feedReducer.live_feed);
    console.log("Live Feed", live_feed)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true);
        dispatch(resetFeeds())
        dispatch(GET_LIVE_FEED())
        setIsLoading(false);
    }, [dispatch])

    const handleFeedSelect = useCallback((feed) => {
        dispatch(selectFeedByID(feed.id))
        dispatch(GET_SELECTED_FEED_CHAT(feed.id));
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


    return (
        <div style={{}}>
            {!isLoading ? (
                    <InfiniteScroll
                        style={{height: "800px"}}
                        dataLength={live_feed.length}
                        next={fetchMoreData}
                        hasMore={true} // should be updated based on whether there are more feeds to load
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {live_feed.map(
                            (item, i) =>
                                <FeedCard key={i}
                                          time={new Date(item.timestamp)}
                                          title={item.title}
                                          text={truncateWords(item.summary, 25)}
                                          tag={item.tag}
                                          onClick={handleFeedSelect}
                                          id={item.id}
                                />
                        )}
                    </InfiniteScroll>

                )
                :
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%"}}>
                    <CircularProgress/>
                </Box>}
        </div>
    )
}

export default ThemeTab;
