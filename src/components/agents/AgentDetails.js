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
    updateAgent,
    deleteAgent,
} from 'src/store/AgentSlice';
import BlankCard from 'src/components/shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import AgentTabs from './AgentTabs';
import AgentConfig from "./AgentConfig";

const AgentDetails = () => {

    const agentData = useSelector(
        (state) => state.agentsReducer.agents[state.agentsReducer.agentData - 1],
    );

    const editContact = useSelector((state) => state.agentsReducer.editContact);
    const dispatch = useDispatch();

    const tableData = [
        {
            id: 1,
            title: 'Firstname',
            alias: 'firstname',
            gdata: agentData ? agentData.firstname : '',
            type: 'text',
        },
        {
            id: 2,
            title: 'Lastname',
            alias: 'lastname',
            gdata: agentData ? agentData.lastname : '',
            type: 'text',
        },
        {
            id: 3,
            title: 'Company',
            alias: 'company',
            gdata: agentData ? agentData.company : '',
            type: 'text',
        },
        {
            id: 4,
            title: 'Department',
            alias: 'department',
            gdata: agentData ? agentData.department : '',
            type: 'text',
        },
        {
            id: 5,
            title: 'Email',
            alias: 'email',
            gdata: agentData ? agentData.email : '',
            type: 'email',
        },
        {
            id: 6,
            title: 'Phone',
            alias: 'phone',
            gdata: agentData ? agentData.phone : '',
            type: 'phone',
        },
        {
            id: 7,
            title: 'Address',
            alias: 'address',
            gdata: agentData ? agentData.address : '',
            type: 'text',
        },
        {
            id: 8,
            title: 'Notes',
            alias: 'notes',
            gdata: agentData ? agentData.notes : '',
            type: 'text',
        },
    ];

    return (
        <>
            {/* ------------------------------------------- */}
            {/* Contact Detail Part */}
            {/* ------------------------------------------- */}
            {agentData && !agentData.deleted ? (
                <>
                    <Box sx={{overflow: 'auto'}}>
                        {!editContact ? (
                            <Box>
                                <Box p={3}>
                                    <Box display="flex"
                                         flexDirection={"column"}
                                         alignItems="center">
                                        <Avatar
                                            alt={agentData.image}
                                            src={agentData.image}
                                            sx={{width: '72px', height: '72px'}}
                                        />
                                        <Typography variant="h6" mb={0.5}>
                                            {agentData.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"
                                                    mb={0.5}>
                                            {agentData.role}
                                        </Typography>

                                    </Box>
                                    <AgentTabs></AgentTabs>
                                    <Box sx={{overflow: 'auto'}}>
                                        <AgentConfig></AgentConfig>
                                    </Box>
                                </Box>
                                <Box p={3} gap={1} display="flex">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => dispatch(setAgentEditable())}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="medium"
                                        onClick={() => dispatch(deleteAgent(agentData.id))}
                                    >
                                        Delete
                                    </Button>
                                </Box>


                            </Box>


                        ) : (
                            <>
                                <BlankCard sx={{p: 0}}>
                                    <Scrollbar sx={{height: {lg: 'calc(100vh - 360px)', md: '100vh'}}}>
                                        <Box pt={1}>
                                            {tableData.map((data) => (
                                                <Box key={data.id} px={3} py={1.5}>
                                                    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                                                        {data.title}
                                                    </Typography>
                                                    <TextField
                                                        id="firstname"
                                                        size="small"
                                                        fullWidth
                                                        type="text"
                                                        value={data.gdata}
                                                        onChange={(e) =>
                                                            dispatch(updateAgent(agentData.id, data.alias, e.target.value))
                                                        }
                                                    />
                                                </Box>
                                            ))}
                                            <Box p={3}>
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    onClick={() => dispatch(setAgentEditable())}
                                                >
                                                    Save Contact
                                                </Button>
                                            </Box>
                                        </Box>
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
