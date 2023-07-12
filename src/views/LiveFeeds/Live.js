import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Box, CircularProgress} from "@mui/material";
import {sub} from 'date-fns';

import FeedCard from "../../components/feed/feed";
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import {feedSlice, selectFeed, resetFeeds} from "src/store/feedSlice";
import {useCallback} from "react";
import {GET_LIVE_FEED} from "../../services/LiveFeedService";

const Live = () => {
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
        dispatch(selectFeed(feed))
    }, [dispatch])

    return (
        <div style={{height: "100%"}}>
            {!isLoading ? (
                    <Scrollbar sx={{overflow: 'auto', height: "calc(100vh - 265px)"}}>
                        {live_feed.map(
                            (item, i) =>
                                <FeedCard key={i}
                                          time={sub(new Date(), {days: 0, hours: 1, minutes: 45})}
                                          title={item.title}
                                          text={item.text}
                                          tag={item.tag}
                                          onClick={handleFeedSelect}
                                          id={item.id}
                                />
                        )
                        }
                    </Scrollbar>
                )
                :
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%"}}>
                    <CircularProgress/>
                </Box>}
        </div>
    )
}

export default Live
