import {useState, useEffect} from 'react';
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
import {useDispatch} from 'react-redux';
import {showNotification} from "src/store/NotificationSlice";
import {replaceUnderscoresAndCapitalize} from "../../utils/formatting";
import {supabase} from "src/supabase/supabase"

const AgentAdd = () => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const [agent_roles, setAgentRoles] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState({})

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        const fetchAgentRoles = async () => {
            const {data: agent_roles, error} = await supabase
                .from('agent_types')
                .select('*')
            if (error) {
                console.error("Error fetching agent_roles", error)
            } else {
                if (agent_roles) {
                    setAgentRoles(agent_roles)
                }
            }
        }
        fetchAgentRoles()
    }, []);


    const formik = useFormik({
        initialValues: {
            "uid": "417ddd7b-3342-4bcf-926d-887c01ca562c",
            "llm": "gpt_3_5_turbo",
            "image_url": "https://i.ibb.co/JKn3XH6/Screenshot-2023-05-15-at-2-33-24-PM.png",
            "agent_template_id": "",
            "settings": []
        },
        // TODO Implement proper format of values for creating an agent
        // TODO Some issues with grabing values from the formik form due to formik provider
        onSubmit: (values) => {
            console.log(values);
            const finalValues = {
                ...values,
                _settings: Object.entries(values._settings).map(([group, settings]) =>
                    Object.entries(settings).map(([name, value]) => ({
                        group, name, value
                    }))
                ).flat()
            };
            console.log(finalValues);
            setModal(false);
            // dispatch(addAgent(finalValues));
            dispatch(showNotification({
                severity: 'success',
                title: 'Success',
                message: 'Agent created successfully!'
            }));
        }
    });


    const handleRoleChange = (event) => {
        const selectedRoleId = event.target.value;
        const selectedRole = agent_roles.find(role => role.id === selectedRoleId);
        setSelectedTemplate(selectedRole);
    };


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
                        <FormikProvider value={formik}>
                            <Form>
                                <Grid spacing={3} container>
                                    <Grid item xs={12} lg={12}>
                                        <FormLabel>Agent role</FormLabel>
                                        <CustomSelect fullWidth variant="outlined" value={selectedTemplate?.id || ""}
                                                      onChange={handleRoleChange}>
                                            {agent_roles.map((option) => (
                                                <MenuItem value={option.id} key={option.id}>
                                                    {replaceUnderscoresAndCapitalize(option.type)}
                                                </MenuItem>
                                            ))}
                                        </CustomSelect>


                                    </Grid>


                                    <Grid item xs={12} lg={12} style={{marginBottom: '40px'}}>
                                        {selectedTemplate && <AddAgentConfigForm templateId={selectedTemplate.id}/>}
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
