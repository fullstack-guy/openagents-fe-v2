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
import BlankCard from 'src/components/shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import {IconAB2, IconBolt, IconDatabase, IconSettings} from "@tabler/icons";
import AgentSourcesTable from "./AgentSourcesTable";
import AgentConfigForm from "../AgentConfigForm";

const AgentDetails = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selected_agent_data = useSelector((state) => state.agentsReducer.selected_agent_data);
    const editContact = useSelector((state) => state.agentsReducer.editContact);

    return (

        <>

            {selected_agent_data && !selected_agent_data.deleted ? (
                <>
                    <Box sx={{overflow: 'auto'}}>
                        {!editContact ? (
                            <Box>
                                <Box p={3}>
                                    <Box display="flex"
                                         flexDirection={"column"}
                                         alignItems="center">
                                        <Avatar
                                            alt={selected_agent_data.image}
                                            src={selected_agent_data.photo_url}
                                            sx={{width: '72px', height: '72px'}}
                                        />
                                        <Typography variant="h6" mb={0.5}>
                                            {selected_agent_data.configs.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    mb={0.5}>
                                            {selected_agent_data.role}
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
                                            value === 0 ? <AgentConfigForm agent_configs={selected_agent_data.configs}/> :
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
