import React, { useState } from 'react';
import { Button, Box, Drawer, useMediaQuery, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/shared/breadcrumb/Breadcrumb';
import ScrollableFeed from 'react-scrollable-feed'
import FeedCard from "../../components/feed/feed";
import { sub } from 'date-fns';

const Feed = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const items = [{
    'title': 'Big flows going through Ethereum!',
    'tag': "ETH",
    'text': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, nibh nibh vehicula odio, sed vulputate nisl diam sit amet urna. Sed euismod, diam id tincidunt dapibus, nibh nibh vehicula odio, sed vulputate nisl diam sit amet urna. Sed euismod, diam id tincidunt dapibus, nibh nibh vehicula odio, sed vulputate nisl diam sit amet urna. Sed euismod, diam id tincidunt dapibus, nibh nibh vehicula odio, sed vulputate nisl diam sit amet urna.",
    'stats': [
      {
        'live_price': 153,
      },
      {
        'pct_change_since': 0.05
      }
    ],
    "explanation": "erer"
  }];

  return (
    <PageContainer title="Contact App" description="this is Contact page">

      <Grid container justifyContent="center" alignItems="center">

        <Grid item xs={12} sm={6}>
      <Breadcrumb
          title="Open Agents crypto feed"/>
          <ScrollableFeed>
            {items.map(
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
