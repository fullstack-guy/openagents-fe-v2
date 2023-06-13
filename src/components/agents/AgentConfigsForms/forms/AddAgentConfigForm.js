import {FormLabel, Grid, TextField} from "@mui/material";
import React from "react";
import {useFormikContext, FormikProvider, Form} from 'formik';

const AddAgentConfigForm = () => {
    const {values, handleChange} = useFormikContext();
    const configs = {
        "info": [
            {
                "name": "website_url",
                "type": "text",
                "required_at_init": true,
                "label": "Website url",
                "placeholder": "https://www.example.com",
            }
        ]
    }

    return (
        <Grid item xs={12} lg={12}>
            <FormLabel>Website url</FormLabel>
            <TextField
                id="website_url"
                size="small"
                variant="outlined"
                fullWidth
                placeholder={'https://www.example.com'}
                onChange={handleChange}
                key={values.configs.website_url}
            />
        </Grid>
    )
};

export default AddAgentConfigForm;