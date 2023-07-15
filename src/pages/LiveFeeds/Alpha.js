import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {selectFeedByID, resetFeeds, appendFeeds, prependFeed} from "src/store/feedSlice";
import {useCallback} from "react";
import {GET_LIVE_FEED} from "../../services/LiveFeedService";
import {supabase} from 'src/supabase/supabase';
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


    return (
        <div >

        </div>
    )
}

export default ThemeTab;
