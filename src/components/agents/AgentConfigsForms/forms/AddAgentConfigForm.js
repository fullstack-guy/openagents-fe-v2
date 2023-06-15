import React from 'react';
import {TextField, Typography, Grid, FormLabel} from "@mui/material";
import {useFormikContext} from 'formik';

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

    function replaceUnderscoresAndCapitalize(str) {
        let modifiedStr = str.replace(/_/g, ' '); // replace underscores with spaces
        modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1); // capitalize first letter
        return modifiedStr;
    }

    return (
        <Grid container spacing={5}>
            {Object.entries(configs).map(([section, configs]) => (
                <Grid item xs={12}>
                    <Typography variant="h6">
                        {replaceUnderscoresAndCapitalize(section)}
                    </Typography>
                        {configs.map((config, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <FormLabel>{replaceUnderscoresAndCapitalize(config.name)}</FormLabel>
                                    <TextField
                                        id={`${section}.${config.name}`}
                                        name={`${section}.${config.name}`}
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        placeholder={config.placeholder}
                                        onChange={handleChange}
                                        value={values[section] && values[section][config.name]}
                                    />
                                </Grid>
                            )
                        })}

                </Grid>
            ))}
        </Grid>
    )
};

export default AddAgentConfigForm;
