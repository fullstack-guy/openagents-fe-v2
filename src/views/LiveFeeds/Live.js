import { useState, useEffect } from "react"
import { Box, CircularProgress } from "@mui/material";
import { sub } from 'date-fns';

import { supabase } from 'src/supabase/supabase';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';
import FeedCard from "../../components/feed/feed";
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

const Live = () => {
  const [feeds, setFeeds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { session } = useSupabaseContext()

  const getFeedList = async () => {
    try {
      setIsLoading(true);
      const { data, error, status } = await supabase.from('feeds').select(`*`);
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
  return (
    <div style={{ height: "100%" }}>
      {feeds.length > 0 ? (
        <Scrollbar sx={{ overflow: 'auto' }} style={{ height: '740px' }}>
          {feeds.map(
            (item, i) =>
              <FeedCard key={i}
                time={sub(new Date(), { days: 0, hours: 1, minutes: 45 })}
                from={item.title}
                subject={item.text}
                label={item.tag}
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
