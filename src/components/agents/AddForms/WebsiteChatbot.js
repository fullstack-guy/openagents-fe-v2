import {FormLabel, Grid, TextField} from "@mui/material";
import React from "react";
import {useFormikContext, FormikProvider, Form} from 'formik';

const WebsiteChatbotAdd = () => {
    const {values, handleChange} = useFormikContext();

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

export default WebsiteChatbotAdd;