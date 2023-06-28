import React, { useState, useEffect } from 'react';
import { Button, Box, Card, CardContent, Drawer, Typography, useMediaQuery, Grid, Paper, Tab, Divider, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { sub } from 'date-fns';

import PageContainer from 'src/components/container/PageContainer';
import ScrollableFeed from 'react-scrollable-feed'
import FeedCard from "../../components/feed/feed";
import BlankCard from 'src/components/shared/BlankCard';
import Chats from '../Chat/Chat';
import { supabase } from 'src/supabase/supabase';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';

const TABs = [
  { label: 'Sources', disabled: false, component: <div>Market and Sources</div> },
  { label: 'Chart', disabled: false, component: <Chats /> },
];

const Feed = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [tabId, setTabId] = useState(0);
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

  const handleTabChange = (event, newId) => {
    setTabId(newId);
  };

  return (
    <PageContainer title="Feed" description="this is feed page">
      <Grid container>
        <Grid item xs={12} lg={4}>
          <BlankCard>
            <CardContent>
              <Typography variant="h2" textAlign="center">Live Feeds</Typography>
            </CardContent>
          </BlankCard>
          <ScrollableFeed>
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
          </ScrollableFeed>
        </Grid>
        <Grid item xs={12} lg={8}>
          <TabContext value={tabId}>
            <Box>
              <TabList variant="scrollable"
                scrollButtons="auto" onChange={handleTabChange} aria-label="lab API tabs example">
                {TABs.map((tab, index) => (
                  <Tab key={index} label={tab.label} value={index} />
                ))}
              </TabList>
            </Box>
            <Divider />
            <Box mt={2}>
              {TABs.map((panel, index) => (
                <TabPanel key={index} value={index}>
                  {panel.component}
                </TabPanel>
              ))}
            </Box>
          </TabContext>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Feed;
