import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, TextField, Typography, Grid, Stack} from '@mui/material';
import {setAgentEditable, updateAgent} from 'src/store/AgentSlice';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import BlankCard from 'src/components/shared/BlankCard';
import SketchExample from "src/components/shared/HexColourButton";

const AgentConfig = () => {
    const selected_agent_id = useSelector((state) => state.agentsReducer.selectedAgentId);
    const isAgentEditable = useSelector((state) => state.agentsReducer.isAgentEditable);

    const dispatch = useDispatch();

    const configData = [
        {
            name: 'source_url',
            value: "Maff.tv",
        },
        {
            name: 'color',
            value: "",
        },
    ];

    const renderField = (data) => {
        switch (data.name) {
            case 'source_url':
                return (
                    <TextField
                        id={data.name}
                        size="small"
                        fullWidth
                        type="text"
                        value={data.value}
                        onChange={(e) =>
                            dispatch(updateAgent(data.name, e.target.value))
                        }
                    />
                );
            case 'color':
                return (
                    <SketchExample
                        color={"black"}
                    />
                );
            // handle more types as needed
            default:
                return null;
        }
    };

    return (
        <Box sx={{overflow: 'auto'}}>

            {!isAgentEditable ? (

                <Box p={3}>
                    <Grid container spacing={3}>
                        {configData.map((data) => (
                            <Grid item xs={12} sm={6} key={data.id}>
                                <Typography variant="body2" color="text.secondary">
                                    {data.name}
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
            ) : (
                <BlankCard sx={{p: 0}}>
                    <Scrollbar sx={{height: {lg: 'calc(100vh - 360px)', md: '100vh'}}}>
                        <Box pt={1}>
                            {configData.map((data) => (
                                <Box key={data.id} px={3} py={1.5}>
                                    <Typography variant="subname1" fontWeight={600} mb={0.5}>
                                        {data.name}
                                    </Typography>
                                    {renderField(data)}
                                </Box>
                            ))}
                            <Box p={3} display="flex" justifyContent="flex-end">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => dispatch(setAgentEditable())}
                                >
                                    Save Config
                                </Button>
                            </Box>
                        </Box>
                    </Scrollbar>
                </BlankCard>
            )}
        </Box>
    );
};

export default AgentConfig;
