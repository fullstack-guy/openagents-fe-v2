import {useState} from 'react';
import {Box, CardContent, Tab, Tabs, Typography} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';
import AppCard from 'src/components/shared/AppCard';
import CustomTab from "src/components/forms/theme-elements/CustomTab";

import NewsTab from './LiveTab';
import ThemeTab from './Alpha';
import {useTheme} from '@mui/material';

const FeedTabs = [
    {label: 'Live', disabled: false, component: <NewsTab/>},
];

const LiveFeeds = () => {
    const [tabId, setTabId] = useState(0);
    const handleTabChange = (event, newId) => {
        setTabId(newId);
    };
    const theme = useTheme();

    return (
        <Box sx={{
            height: "100vh",
            borderRight: "solid 1px " + theme.palette.divider,
            borderRadius: '0px',
        }}>

            <TabContext value={tabId}>
                <Box sx={{
                    borderRadius: '0px',

                }}>
                    <Box sx={{}}>
                        <Tabs
                            value={tabId}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            {FeedTabs.map((tab, index) => (
                                <CustomTab key={index}
                                           label={tab.label}
                                           value={index}
                                           sx={
                                               {
                                                   ":hover": {
                                                       bgcolor: 'primary.light'
                                                   },
                                               }}/>
                            ))}
                        </Tabs>
                    </Box>
                    <Box mt={0}>
                        {FeedTabs.map((panel, index) => (
                            <TabPanel key={index} value={index} sx={{margin: 0, padding: 0}}>
                                {panel.component}
                            </TabPanel>
                        ))}
                    </Box>
                </Box>


            </TabContext>
        </Box>

    )
}

export default LiveFeeds
