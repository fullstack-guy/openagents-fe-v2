import {useState} from 'react';
import {Box, CardContent, Tab, Tabs, Typography} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';

import Live from './Live';
import Alpha from './Alpha';


const LiveTabs = [
    {label: 'Live', disabled: false, component: <Live/>},
    {label: 'Alpha', disabled: false, component: <Alpha/>},
];

const LiveFeeds = () => {
    const [tabId, setTabId] = useState(0);
    const handleTabChange = (event, newId) => {
        setTabId(newId);
    };

    return (
        <TabContext value={tabId}>
            <CardContent>
                <Typography variant="h4"
                            textAlign="left"
                            sx={{
                                ml: 1,
                            }}>Feed</Typography>
            </CardContent>
            <Box sx={{padding: "0 24px", border: "none"}}>
                <Tabs
                    value={tabId}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {LiveTabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} value={index}
                             sx={
                                 {
                                     ":hover": {
                                         bgcolor: 'primary.light'
                                     },
                             }}/>
                    ))}
                </Tabs>
            </Box>
            <Box mt={2}>
                {LiveTabs.map((panel, index) => (
                    <TabPanel key={index} value={index}>
                        {panel.component}
                    </TabPanel>
                ))}
            </Box>
        </TabContext>
    )
}

export default LiveFeeds
