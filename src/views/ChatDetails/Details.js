import {useState} from 'react';
import {Box, Grid, CardContent, Tab, Tabs, Typography} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';

import ChatWindow from './ChatWindow';
import Overview from './Overview';
import CustomTab from "../../components/forms/theme-elements/CustomTab";
import {useTheme} from '@mui/material';


const DetailsTabs = [
    {label: 'Analytics', disabled: false, component: <Overview/>},
    {label: 'Related', disabled: false, component: <Overview/>},
];


const FeedDetails = () => {
    const [tabId, setTabId] = useState(1);
    const handleTabChange = (event, newId) => {
        setTabId(newId);
    };
    const theme = useTheme();

    return (
        <Grid container spacing={3} my={1} sx={{

        }}>  {/* Added Grid component with spacing prop */}

            <Grid item xs={12}>
                <TabContext value={tabId}>
                    <Box sx={{}}>
                        <Tabs
                            value={tabId}
                            onChange={handleTabChange}
                            indicatorColor="transparent"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            {DetailsTabs.map((tab, index) => (
                                <Tab key={index} label={tab.label} value={index}
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
                            {DetailsTabs.map((panel, index) => (
                                <TabPanel key={index} value={index}>
                                    {panel.component}
                                </TabPanel>
                            ))}
                        </Box>
                    </Box>
                </TabContext>
            </Grid>

            <Grid item xs={12}> {/* Each direct child in a Grid container should be a Grid item */}
                <ChatWindow/>
            </Grid>
        </Grid>
    )
}

export default FeedDetails
