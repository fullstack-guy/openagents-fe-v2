import React, { useState, useEffect } from 'react';
import { Button, Box, Drawer, useMediaQuery, Grid } from '@mui/material';
import { sub } from 'date-fns';

import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/shared/breadcrumb/Breadcrumb';
import ScrollableFeed from 'react-scrollable-feed'
import FeedCard from "../../components/feed/feed";
import { supabase } from 'src/supabase/supabase';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';

const Feed = () => {

  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [isLoading, setIsLoading] = useState(false)
  const [feeds, setFeeds] = useState([])
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
    <PageContainer title="Contact App" description="this is Contact page">

      <Grid container justifyContent="center" alignItems="center">

        <Grid item xs={12} sm={6}>
          <Breadcrumb
            title="Open Agents crypto feed" />
          <ScrollableFeed>
            {feeds.map(
              (item, i) =>
                <FeedCard key={i}
                  time={sub(new Date(), { days: 0, hours: 1, minutes: 45 })}
                  from={item.title}
                  subject={item.text}
                  label={item.tag}

                ></FeedCard>
            )
            }
          </ScrollableFeed>
        </Grid>
      </Grid>

    </PageContainer>
  );
};

export default Feed;
