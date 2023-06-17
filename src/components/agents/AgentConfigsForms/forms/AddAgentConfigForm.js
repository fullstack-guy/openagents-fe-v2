import React from 'react';
import {TextField, Typography, Grid, FormLabel, DialogContentText} from "@mui/material";
import {useFormikContext} from 'formik';
import {SupabaseContext} from 'src/supabase/SupabaseContext';
import {useEffect, useContext, useState} from 'react';

const AddAgentConfigForm = ({templateId}) => {
    const {values, handleChange} = useFormikContext();
    const supabase = useContext(SupabaseContext);
    const [agentSettings, setAgentSettings] = useState([])

    useEffect(() => {
        const fetchAgents = async () => {
            const {data: agent_settings_templates, error} = await supabase
                .from('agent_settings_templates')
                .select('name, type, label')
                .eq('agent_template_id', templateId)
                .eq('is_required', true);

            if (error) {
                console.error(error);
            } else {
                setAgentSettings(agent_settings_templates || []);
            }
        };
        fetchAgents();
    }, [templateId, supabase]);

    const configs = {
        "info": agentSettings,
    }

    function replaceUnderscoresAndCapitalize(str) {
        let modifiedStr = str.replace(/_/g, ' '); // replace underscores with spaces
        modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1); // capitalize first letter
        return modifiedStr;
    }

    return (
        <Grid container spacing={5}>
            <Grid mt={3} item xs={12} lg={12}>
                <DialogContentText id="alert-dialog-description">
                    Configurations
                </DialogContentText>
            </Grid>
            {Object.entries(configs).map(([section, configs]) => (
                // if length of configs > 0, then display the section
                configs.length > 0 &&
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
