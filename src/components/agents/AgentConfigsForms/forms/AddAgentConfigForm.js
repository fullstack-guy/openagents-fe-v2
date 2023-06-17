import React, {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import {Grid, FormLabel, DialogContentText, Typography} from "@mui/material";
import {getComponentByType} from "src/components/forms/config-component/getComponentByType";
import {useDispatch} from 'react-redux';
import {handleSupabaseError, supabase} from 'src/supabase/supabase';

const AddAgentConfigForm = ({templateId}) => {
    const {values, handleChange} = useFormikContext();
    const dispatch = useDispatch();
    const [agentSettings, setAgentSettings] = useState([]);

    // Inside your React component
    useEffect(() => {
        const fetchAgentSettingTemplates = async () => {
            const response = await supabase
                .from('agent_settings_templates')
                .select('group, name, type, label')
                .eq('agent_template_id', templateId)
                .eq('is_required', true);
            handleSupabaseError(dispatch, response);
            return response;
        };

        fetchAgentSettingTemplates().then(({data}) => {
            if (data) {
                const groupedSettings = {};
                (data || []).forEach((setting) => {
                    if (!groupedSettings[setting.group]) {
                        groupedSettings[setting.group] = [];
                    }
                    groupedSettings[setting.group].push(setting);
                });
                setAgentSettings(groupedSettings);
            }
        });
    }, [templateId, supabase, dispatch]);


    function replaceUnderscoresAndCapitalize(str) {
        let modifiedStr = str.replace(/_/g, ' ');
        modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1);
        return modifiedStr;
    }

    return (
        <Grid container spacing={5}>
            <Grid mt={3} item xs={12} lg={12}>
                <DialogContentText id="alert-dialog-description">
                    Configurations
                </DialogContentText>
            </Grid>
            {Object.entries(agentSettings).map(([group, configs]) => (
                configs.length > 0 &&
                <Grid item xs={12} key={group}>
                    <Typography variant="h6">
                        {replaceUnderscoresAndCapitalize(group)}
                    </Typography>
                    {configs.map((config, index) => (
                        <Grid item xs={12} key={index}>
                            <FormLabel>{replaceUnderscoresAndCapitalize(config.name)}</FormLabel>
                            {getComponentByType(config.type, {
                                ...config,
                                name: `settings.${config.name}`
                            }, handleChange, values)}
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    )
};

export default AddAgentConfigForm;
