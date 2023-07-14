import {useState} from 'react';
import {Box, Grid, Tab, Tabs, Typography} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';
import {useSelector} from 'react-redux';

import ChatWindow from '../ChatWindow';
import FeedAnalyticsTab from './FeedAnalyticsTab';
import {useTheme} from '@mui/material';
import FeedRelatedTab from "./RelatedTab";

const DetailsTabs = [
    {label: 'Analytics', disabled: false, component: <FeedAnalyticsTab/>},
    {label: 'Related', disabled: false, component: <FeedRelatedTab/>},
];

const FeedDetails = () => {
    const [tabId, setTabId] = useState(0);
    const handleTabChange = (event, newId) => {
        setTabId(newId);
    };
    const theme = useTheme();

    // use useSelector to get the selectedFeed from the redux store
    const selectedFeed = useSelector((state) => state.feedReducer.selectedFeed);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Grid item xs={12} sx={{ flexBasis: '50%', overflow: 'auto' }}>
                <TabContext value={String(tabId)}>
                    <Box  mt={2} >
                        <Tabs
                            value={String(tabId)}
                            onChange={handleTabChange}
                            indicatorColor="transparent"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"

                        >
                            {DetailsTabs.map((tab, index) => (
                                <Tab key={index} label={tab.label} value={String(index)}
                                     sx={(theme) => ({
                                         backgroundColor: (tabProps) => (tabProps.selected ? 'white' : 'inherit'),
                                         ":hover": {
                                             bgcolor: theme.palette.primary.light,
                                         },
                                     })}
                                />
                            ))}
                        </Tabs>
                        <Box mt={2}>
                            {Object.keys(selectedFeed).length !== 0 ? (
                                DetailsTabs.map((panel, index) => (
                                    <TabPanel key={index} value={String(index)}>
                                        {panel.component}
                                    </TabPanel>
                                ))
                            ) : (
                                <Typography variant="h5" color="text.secondary">
                                    Select a news story
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </TabContext>
            </Grid>
            <Grid item xs={12} sx={{ flexBasis: '50%', overflow: 'auto' }}>
                <ChatWindow/>
            </Grid>
        </Box>
    )
}

export default FeedDetails
