import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAgentConfig, setAgentEditable, updateAgent, updateAgentConfig} from 'src/store/AgentSlice';
import {Box, Button, TextField, Typography} from "@mui/material";
import BlankCard from "../shared/BlankCard";
import SketchExample from "../shared/HexColourButton";
import {useFormik} from 'formik';
import {showNotification} from "src/store/NotificationSlice";

const AgentConfig = ({selectedAgent}) => {
    const dispatch = useDispatch();

    const configData = selectedAgent.configs ? Object.keys(selectedAgent.configs).map(key => {
        return {
            name: key,
            value: selectedAgent.configs[key]
        }
    }) : [];

    const formik = useFormik({
        initialValues: selectedAgent.configs,
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
                <Box pt={1}>
                    {configData.map((data) => (
                        <Box key={data.id} px={3} py={1.5}>
                            <Typography variant="body2" color="text.secondary">
                                {replaceUnderscoresAndCapitalize(data.name)}
                            </Typography>
                            {renderField(data)}
                        </Box>
                    ))}
                    <Box p={3} display="flex" justifyContent="flex-start">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={formik.handleSubmit}
                        >
                            Save Config
                        </Button>
                    </Box>
                </Box>
            </form>
        </BlankCard>
    )
        ;
};

export default AgentConfig;


