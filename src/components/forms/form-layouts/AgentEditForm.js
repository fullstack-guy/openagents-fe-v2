import React from 'react';
import {
    Grid,
    InputAdornment,
    Button,
    Typography,
    Divider,
    MenuItem,
    IconButton,
    Stack
} from '@mui/material';

import {IconEye, IconEyeOff} from '@tabler/icons';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';

import CustomFormLabel from '../theme-elements/CustomFormLabel';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomSwitch from "../theme-elements/CustomSwitch";
import SketchExample from "../form-elements/button/HexColourButton";
import {useState} from 'react';

const AgentEditForm = () => {

    // IMPLEMENT HERE

    const selectedAgentId = useSelector((state) => state.agentsReducer.agentContent);
    const agents = useSelector((state) => state.agentsReducer.agents);
    const agent = agents.find(agent => agent.id === selectedAgentId);
    // console.log(agent);
    // console.log(agents);
    // console.log(selectedAgentId);

    // const agent = agents.find(agent => agent.id === selectedAgentId);
    const [selectedColor, setSelectedColor] = useState("blue");

    const onColourChange = (color) => {
        console.log("Colour changed");
        setSelectedColor(color)
        formik.setFieldValue('color', selectedColor)
    };

    const formik = useFormik({
        initialValues: {
            name: agent.name, // replace with actual agent name
            status: agent.status, // replace with actual agent status
            color: "blue", // replace with actual agent colour
        },
        onSubmit: (values) => {
            console.log(values);
            // Add the API call here to update the agent details.
        }
    });

    return (
        <div style={{
            padding: "30px"
        }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>

                    <Grid item xs={12} sm={6}>
                        <CustomFormLabel htmlFor="fs-fname" sx={{mt: 0}}>
                            Name
                        </CustomFormLabel>
                        <CustomTextField
                            id="fs-fname"
                            placeholder="John"
                            fullWidth
                            {...formik.getFieldProps('name')}
                        />
                        <CustomFormLabel htmlFor="fs-date" sx={{mt: 3}}>
                            Picture
                        </CustomFormLabel>
                        <Button variant="contained" color="primary" component="label">
                            Upload
                            <input hidden accept="image/*" multiple type="file"/>
                        </Button>

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomFormLabel htmlFor="fs-lname" sx={{mt: {sm: 0}}}>
                            Status
                        </CustomFormLabel>
                        <CustomSwitch
                            onClick={() => {
                                formik.setFieldValue('status', formik.values.status === 'active' ? 'inactive' : 'active');
                                console.log(formik.values.status);
                            }}
                            checked={formik.values.status === 'inactive'}
                        />
                        <CustomFormLabel htmlFor="fs-language">Colour</CustomFormLabel>

                        <Stack direction="row" justifyContent="start" spacing={2} my={3}>
                            <SketchExample
                                color={selectedColor}
                                onChange={(color) => setSelectedColor(color) &&
                                    formik.setFieldValue('color', selectedColor) &&
                                    console.log(formik.values.color)}
                                {...formik.getFieldProps('color')}
                            />
                            <Button variant="outlined" color="error">
                                Reset
                            </Button>
                        </Stack>


                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <Stack direction="row" spacing={5}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                            <Button variant="text" color="error">
                                Cancel
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AgentEditForm;
