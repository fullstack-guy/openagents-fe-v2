import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Box,
    Button,
    TextField,
    Typography,
    Avatar,
    Divider,
    IconButton,
    Stack,
    Grid,
    Tooltip, Tabs, Tab,
} from '@mui/material';
import {
    setAgentEditable,
    deleteAgent,
    getSelectedAgent,
} from 'src/store/AgentSlice';
import BlankCard from 'src/components/shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import AgentTabs from './AgentTabs';
import AgentConfig from "./AgentConfig";
import {IconAB2, IconBolt, IconDatabase, IconSettings} from "@tabler/icons";
import AgentSourcesTable from "./AgentSourcesTable";

const AgentDetails = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const agents = useSelector((state) => state.agentsReducer.agents);
    const selectedAgentId = useSelector((state) => state.agentsReducer.selectedAgentId);
    const selectedAgent = agents.find(x => x.id === selectedAgentId);

    const editContact = useSelector((state) => state.agentsReducer.editContact);
    return (

        <>


            {selectedAgent && !selectedAgent.deleted ? (
                <>
                    <Box sx={{overflow: 'auto'}}>
                        {!editContact ? (
                            <Box>
                                <Box p={3}>
                                    <Box display="flex"
                                         flexDirection={"column"}
                                         alignItems="center">
                                        <Avatar
                                            alt={selectedAgent.image}
                                            src={selectedAgent.photo_url}
                                            sx={{width: '72px', height: '72px'}}
                                        />
                                        <Typography variant="h6" mb={0.5}>
                                            {selectedAgent.agent_configs.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    mb={0.5}>
                                            {selectedAgent.role}
                                        </Typography>

                                    </Box>
                                    <Box sx={{width: '100%'}}
                                         style={{
                                             marginTop: "30px",
                                             marginBottom: "30px",
                                         }}>
                                        <Tabs variant={"fullWidth"} value={value} onChange={handleChange}
                                              aria-label="contact details tabs"
                                              sx={{width: '100%'}}>
                                            <Tab icon={<IconSettings/>} label="Configs"
                                                 sx={{":hover": {bgcolor: 'primary.light'}}}/>
                                            <Tab icon={<IconDatabase/>} label="Sources"
                                                 sx={{":hover": {bgcolor: 'primary.light'}}}/>
                                            <Tab icon={<IconBolt/>} label="Deploy"
                                                 sx={{":hover": {bgcolor: 'primary.light'}}}/>
                                            <Tab icon={<IconAB2/>} label="Test"
                                                 sx={{minWidth: 80, ":hover": {bgcolor: 'primary.light'}}}/>
                                        </Tabs>
                                    </Box>
                                    <Box sx={{overflow: 'auto'}}>
                                        {
                                            value === 0 ? <AgentConfig selectedAgent={selectedAgent}></AgentConfig> :
                                                value === 1 ? <AgentSourcesTable></AgentSourcesTable> :
                                                null
                                        }
                                    </Box>

                                </Box>
                            </Box>


                        ) : (
                            <>
                                <BlankCard sx={{p: 0}}>
                                    <Scrollbar sx={{height: {lg: 'calc(100vh - 360px)', md: '100vh'}}}>

                                    </Scrollbar>
                                </BlankCard>
                            </>
                        )}
                    </Box>
                </>
            ) : (
                <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
                    {/* ------------------------------------------- */}
                    {/* If no Contact  */}
                    {/* ------------------------------------------- */}
                    <Box>
                        <Typography variant="h4">Please Select a Contact</Typography>
                        <br/>
                        <img src={emailIcon} alt={emailIcon} width={'250px'}/>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default AgentDetails;
