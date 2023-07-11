import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import { sub } from 'date-fns';

import { supabase } from 'src/supabase/supabase';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';
import FeedCard from "../../components/feed/feed";
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { setFeed } from "src/store/feedSlice";
import { useCallback } from "react";

const Live = () => {
  const [feeds, setFeeds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const { session } = useSupabaseContext()

  const getFeedList = async () => {
    try {
      setIsLoading(true);
      const { data, error, status } = await supabase.from('feed').select(`*`);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFeeds(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeedList()
  }, [session])

  const handleFeedSelect = useCallback((feed) => {
    dispatch(setFeed(feed))
  }, [dispatch])

  return (
    <div style={{ height: "100%" }}>
      {!isLoading ? (
        <Scrollbar sx={{ overflow: 'auto', height: "calc(100vh - 265px)" }}>
          {feeds.map(
            (item, i) =>
              <FeedCard key={i}
                time={sub(new Date(), { days: 0, hours: 1, minutes: 45 })}
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
        <CircularProgress />
      </Box>}
    </div>
  )
}

export default Live
