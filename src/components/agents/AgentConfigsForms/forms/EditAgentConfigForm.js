import React from 'react';
import {useDispatch} from 'react-redux';
import {setAgentEditable, updateAgentConfig} from 'src/store/AgentSlice';
import {Box, Button, Typography, Grid} from "@mui/material";
import BlankCard from "../../../shared/BlankCard";
import {useFormik} from 'formik';
import {showNotification} from "src/store/NotificationSlice";
import AgentConfigField from "../fields/AgentConfigField";

const EditAgentConfigForm = ({agent_configs_dict}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: agent_configs_dict,
        onSubmit: (values, {setSubmitting}) => {
            dispatch(updateAgentConfig(values));
            setSubmitting(false);
            console.log(values)
            dispatch(showNotification({
                severity: 'success',
                title: 'Success',
                message: 'The operation completed successfully.'
            }));
        },
    });

    return (
        <BlankCard sx={{p: 0}}>
            <form>
                <Box p={3}>
                    <Grid container spacing={3}>
                        {Object.entries(agent_configs_dict).map(([section, name_values]) => (
                            <Grid item xs={12}>
                                <Typography variant="h5" color="text.primary">
                                    {section}
                                </Typography>
                                <Grid container spacing={2}>
                                    {Object.keys(name_values).map((config, index) => {
                                        return (
                                            <Grid item xs={6} key={index}>
                                                <AgentConfigField
                                                    section={section}
                                                    name={config}
                                                    value={name_values[config]}
                                                    formik={formik}>
                                                </AgentConfigField>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
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
};

export default EditAgentConfigForm;