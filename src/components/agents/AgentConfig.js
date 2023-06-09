import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, Typography, Grid, Stack} from '@mui/material';
import {setAgentEditable} from 'src/store/AgentSlice';
import AgentConfigForm from 'src/components/agents/AgentConfigForm';
import NotificationOld from "src/components/shared/NotificationOld";

function replaceUnderscoresAndCapitalize(str) {
    var modifiedStr = str.replace(/_/g, ' ')
        .split(' ')
        .join(' ');
    modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1);
    return modifiedStr;
}

const AgentConfig = ({selectedAgent}) => {
    const isAgentEditable = useSelector((state) => state.agentsReducer.isAgentEditable);
    const dispatch = useDispatch();

    const configData = selectedAgent.agent_configs ? Object.keys(selectedAgent.agent_configs).map(key => {
        return {
            name: key,
            value: selectedAgent.agent_configs[key]
        }
    }) : [];


    return (

        <Box sx={{overflow: 'auto'}}>

            {isAgentEditable ? (
                <AgentConfigForm selectedAgent={selectedAgent}/>
            ) : (
                <Box p={3}>
                    <Grid container spacing={3}>
                        {configData.map((data) => (
                            <Grid item xs={12} sm={6} key={data.id}>
                                <Typography variant="body2" color="text.secondary">
                                    {replaceUnderscoresAndCapitalize(data.name)}
                                </Typography>
                                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                                    {data.value}
                                </Typography>

                            </Grid>
                        ))}
                    </Grid>
                    <Stack spacing={2} direction="row" mt={3}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="medium"
                            onClick={() => dispatch(setAgentEditable())}
                        >
                            Edit Config
                        </Button>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default AgentConfig;
