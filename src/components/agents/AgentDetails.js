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
    Tooltip,
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

const AgentDetails = () => {

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
                                            src={selectedAgent.image}
                                            sx={{width: '72px', height: '72px'}}
                                        />
                                        <Typography variant="h6" mb={0.5}>
                                            {selectedAgent.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    mb={0.5}>
                                            {selectedAgent.role}
                                        </Typography>

                                    </Box>
                                    <AgentTabs></AgentTabs>
                                    <Box sx={{overflow: 'auto'}}>
                                        <AgentConfig selectedAgent={selectedAgent}></AgentConfig>
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
