import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    TextField,
    FormLabel,
    DialogContent,
    DialogContentText,
    Grid, MenuItem, Stack,
} from '@mui/material';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect.js';
import AddAgentConfigForm from "./AgentConfigsForms/forms/AddAgentConfigForm";
import {useFormik, FormikProvider, Form} from "formik";
import {addAgent} from "src/store/AgentSlice"
import {useSelector, useDispatch} from 'react-redux';
import {showNotification} from "src/store/NotificationSlice";

const AgentAdd = () => {
    const [modal, setModal] = React.useState(false);
    const dispatch = useDispatch();

    const toggle = () => {
        setModal(!modal);
    };

    const formik = useFormik({
        initialValues: {
            "role": "Website chatbot",
            "configs": {
                "info": {
                    "name": ""
                }
            }
        },
        onSubmit: (values) => {
            console.log(values);
            setModal(false);
            dispatch(addAgent(values));
            dispatch(showNotification({
                severity: 'success',
                title: 'Success',
                message: 'Agent created successfully!'
            }));
        }
    });

    const AGENT_LIST = ['Website chatbot'];


    return (
        <>
            <Box
                p={3}
                pb={1}
            >
                <Button color="primary" variant="contained" fullWidth onClick={toggle}>
                    Create Agent
                </Button>
            </Box>
            <Dialog

                classes={{paper: 'bordered-box'}}
                open={modal}
                onClose={toggle}
                maxWidth="sm"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" variant="h5">
                    {'Create an Agent'}
                </DialogTitle>
                <DialogContent>

                    <Box sx={{
                        p: 3
                    }}>
                        <DialogContentText id="alert-dialog-description">
                            Step 1: Choose an Agent role<br/>
                        </DialogContentText>
                        <FormikProvider value={formik}>
                            <Form>
                                <Grid spacing={3} container>
                                    <Grid item xs={12} lg={12}>
                                        <FormLabel>Agent role</FormLabel>
                                        <CustomSelect fullWidth variant="outlined">
                                            {AGENT_LIST.map((option) => (
                                                <MenuItem value={formik.values.role}
                                                          onChange={formik.handleChange}
                                                          key={option.value}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>

                                    </Grid>

                                    <Grid mt={3} item xs={12} lg={12}>
                                        <DialogContentText id="alert-dialog-description">
                                            Step 2: Configure your agent
                                        </DialogContentText>
                                    </Grid>

                                    <Grid item xs={12} lg={12} style={{
                                        marginBottom: '40px'
                                    }}>
                                        <AddAgentConfigForm></AddAgentConfigForm>
                                    </Grid>


                                </Grid>
                                <Stack spacing={2}
                                       direction="row"
                                       justifyContent={"center"}
                                       mt={3}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="large"
                                        onClick={formik.handleSubmit}
                                    >
                                        Create agent
                                    </Button>
                                </Stack>
                            </Form>
                        </FormikProvider>
                    </Box>


                </DialogContent>
            </Dialog>
        </>
    );
};

export default AgentAdd;
