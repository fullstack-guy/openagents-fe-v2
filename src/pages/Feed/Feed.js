import React, { useState, useEffect } from 'react';
import { Button, Box, Card, CardContent, Drawer, Typography, useMediaQuery, Grid, Paper, Tab, Divider, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { sub } from 'date-fns';

import PageContainer from 'src/components/container/PageContainer';
import ScrollableFeed from 'react-scrollable-feed'
import FeedCard from "../../components/feed/feed";
import Chats from '../Chat/Chat';
import { supabase } from 'src/supabase/supabase';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

const TABs = [
  { label: 'Sources', disabled: false, component: <div>Market and Sources</div> },
  { label: 'Chat', disabled: false, component: <Chats /> },
];

const Feed = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [tabId, setTabId] = useState('0');
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
      <Grid container height="calc(100vh - 70px)">
        <Grid item xs={12} lg={4} maxHeight="865px" overflow="hidden">
            <CardContent>
              <Typography variant="h2" textAlign="center">Live Feeds</Typography>
            </CardContent>
          <Scrollbar style={{ height: "100%", padding: '25px'}}>
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
        </Grid>
        <Grid item xs={12} lg={8} height="100%">
          <TabContext value={tabId}>
            <Box>
              <TabList variant="scrollable"
                scrollButtons="auto" onChange={handleTabChange} aria-label="lab API tabs example">
                {TABs.map((tab, index) => (
                  <Tab key={index} label={tab.label} value={index.toString()} />
                ))}
              </TabList>
            </Box>
            <Divider />
            <Box mt={2}>
              {TABs.map((panel, index) => (
                <TabPanel key={index} value={index.toString()}>
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
