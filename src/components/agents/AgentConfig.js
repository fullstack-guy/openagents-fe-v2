import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Button, TextField, Typography, Grid, Stack} from '@mui/material';
import {isEditConfig, UpdateConfig} from 'src/store/AgentSlice';
import {ColorPicker} from 'react-color'; // This is just an example, replace with the color picker of your choice
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import BlankCard from 'src/components/shared/BlankCard';

const AgentConfig = () => {
    const configDetail = useSelector((state) => state.agentsReducer.config);
    const editConfig = useSelector((state) => state.agentsReducer.editConfig);
    const dispatch = useDispatch();

    const configData = [
        {
            id: 1,
            name: 'source_url',
            value: configDetail ? configDetail.source_url : '',
        },
        {
            id: 2,
            name: 'color',
            value: configDetail ? configDetail.color : '',
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
                            dispatch(UpdateConfig(data.name, e.target.value))
                        }
                    />
                );
            case 'color':
                return (
                    <ColorPicker
                        color={data.value}
                        onChange={(color) => dispatch(UpdateConfig(data.name, color.hex))}
                    />
                );
            // handle more types as needed
            default:
                return null;
        }
    };

    return (
        <Box sx={{overflow: 'auto'}}>

            {!editConfig ? (
                
                <Box p={3}>
                    <Grid container spacing={3}>
                        {configData.map((data) => (
                            <Grid item xs={12} sm={6} key={data.id}>
                                <Typography variant="subname1" fontWeight={600} mb={0.5}>
                                    {data.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
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
                            onClick={() => dispatch(isEditConfig())}
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
                                    onClick={() => dispatch(isEditConfig())}
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
