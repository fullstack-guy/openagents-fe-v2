import React from 'react';
import {useDispatch} from 'react-redux';
import {setAgentEditable, updateAgentConfig} from 'src/store/AgentSlice';
import {Box, Button, TextField, Typography, Grid} from "@mui/material";
import BlankCard from "../shared/BlankCard";
import SketchExample from "../shared/HexColourButton";
import {useFormik} from 'formik';
import {showNotification} from "src/store/NotificationSlice";

const AgentConfigForm = ({agent_configs}) => {
    const dispatch = useDispatch();

    const configData = agent_configs ? Object.keys(agent_configs).map(key => {
        return {
            name: key,
            value: agent_configs[key]
        }
    }) : [];

    const formik = useFormik({
        initialValues: agent_configs,
        onSubmit: (values, {setSubmitting}) => {
            dispatch(updateAgentConfig(values));
            setSubmitting(false);
            dispatch(setAgentEditable());
            console.log(values)
            dispatch(showNotification({
                severity: 'success',
                title: 'Success',
                message: 'The operation completed successfully.'
            }));
        },
    });

    function replaceUnderscoresAndCapitalize(str) {
        var modifiedStr = str.replace(/_/g, ' ')
            .split(' ')
            .join(' ');
        modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1);
        return modifiedStr;
    }

    const renderField = (data) => {
        switch (data.name) {
            case 'color':
                return (
                    <SketchExample
                        color={data.value || "black"}
                    />
                );
            default:
                return (
                    <TextField
                        id={data.name}
                        size="small"
                        fullWidth
                        type="text"
                        value={formik.values[data.name]}
                        onChange={formik.handleChange}
                    />
                );
        }
    };

    return (

        <BlankCard sx={{p: 0}}>
            <form>
                <Box p={3}>
                    <Grid container spacing={3}>
                        {configData.map((data, index) => (
                            <Grid item xs={6} key={data.id}>
                                <Box px={3} py={1.5}>
                                    <Typography variant="body2" color="text.secondary">
                                        {replaceUnderscoresAndCapitalize(data.name)}
                                    </Typography>
                                    {renderField(data)}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box p={3} display="flex" justifyContent="flex-start">
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={formik.handleSubmit}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </form>
        </BlankCard>
    )
        ;
};

export default AgentConfigForm;


