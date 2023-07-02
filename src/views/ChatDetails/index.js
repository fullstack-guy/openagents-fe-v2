import {useState} from 'react';
import {Box, CardContent, Tab, Tabs, Typography} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';

import Chats from './Chats';
import Sources from './Sources';

const DetailsTabs = [
    {label: 'Sources', disabled: false, component: <Sources/>},
    {label: 'Chat', disabled: false, component: <Chats/>},
];

const ChatDetails = () => {
    const [tabId, setTabId] = useState(1);
    const handleTabChange = (event, newId) => {
        setTabId(newId);
    };

    return (
        <TabContext value={tabId}>
            <CardContent>
                <Typography variant="h4" textAlign="left" sx={{ml: 4}}>Details</Typography>
            </CardContent>
            <Box sx={{padding: "0 44px", border: "none"}}>
                <Tabs
                    value={tabId}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{
                        borderRadius: (theme) => theme.shape.borderRadius / 20,
                        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        width: "50%",
                    }}
                >
                    {DetailsTabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} value={index}/>
                    ))}
                </Tabs>
            </Box>
            <Box mt={2}>
                {DetailsTabs.map((panel, index) => (
                    <TabPanel key={index} value={index}>
                        {panel.component}
                    </TabPanel>
                ))}
            </Box>
        </TabContext>
    )
}

export default ChatDetails
