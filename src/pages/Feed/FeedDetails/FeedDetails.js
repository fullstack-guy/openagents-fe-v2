import {useState} from 'react';
import {Box, Divider, Grid, Tab, Tabs, Typography} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';
import {useSelector} from 'react-redux';

import ChatWindow from '../../../components/chats/ChatWindow';
import FeedAnalyticsTab from './FeedAnalyticsTab';
import {useTheme} from '@mui/material';
import FeedRelatedTab from "./RelatedTab";
import {IconWand} from "@tabler/icons";
import CustomTab from "../../../components/forms/theme-elements/CustomTab";

const DetailsTabs = [
    {label: 'Summary', disabled: false, component: <FeedAnalyticsTab/>},
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
        <Box sx={{
            display: 'flex', flexDirection: 'column', height: '100vh'
        }}>
            <Grid item mt={2} xs={12} sx={{
                flexBasis:
                    '50%',
                overflow: 'auto',
                border: "solid 1px " + theme.palette.divider,
                borderRadius: theme.shape.borderRadius / 20,
            }}>
                <TabContext value={String(tabId)}>

                    <Box
                        sx={{
                            display: "flex",
                            height: "100%",
                            flexDirection: "column",
                            justifyContent: "top",
                            alignItems: "center",
                        }}>
                        <Tabs
                            value={String(tabId)}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                        >
                            {DetailsTabs.map((tab, index) => (
                                <CustomTab key={index} label={tab.label} value={String(index)}

                                />
                            ))}
                        </Tabs>
                        {Object.keys(selectedFeed).length !== 0 ? (
                            DetailsTabs.map((panel, index) => (
                                <TabPanel key={index} value={String(index)}>
                                    {panel.component}
                                </TabPanel>
                            ))
                        ) : (

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexGrow: 1
                                }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                    <IconWand size="35px"
                                              style={{
                                                  color: theme.palette.text.secondary,
                                                  marginBottom: theme.spacing(2)
                                              }
                                              }
                                              stroke={1}
                                              color={theme.palette.text.secondary}>
                                    </IconWand>
                                    <Typography variant="h6" fontWeight={400} color="text.secondary">
                                        Select a story and explore real-time markets with AI
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </TabContext>
            </Grid>
            <Grid item xs={12}>
                <ChatWindow/>
            </Grid>
        </Box>
    )
}

export default FeedDetails
