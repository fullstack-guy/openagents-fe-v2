import React from 'react';
import {TextField, Typography, Box} from "@mui/material";
import SketchExample from "src/components/shared/HexColourButton";

const AgentConfigField = ({section, name, value, formik}) => {

    function replaceUnderscoresAndCapitalize(str) {
        var modifiedStr = str.replace(/_/g, ' ')
            .split(' ')
            .join(' ');
        modifiedStr = modifiedStr.charAt(0).toUpperCase() + modifiedStr.slice(1);
        return modifiedStr;
    }

    const fieldName = `${section}.${name}`;

    switch (name) {
        case 'color':
            return (
                <SketchExample
                    color={value || "black"}
                />
            );
        default:
            return (
                <Box px={3} py={1.5}>
                    <Typography
                        variant="body2"
                        color="text.secondary">
                        {replaceUnderscoresAndCapitalize(name)}
                    </Typography>
                    <TextField
                        id={fieldName}
                        name={fieldName}
                        size="small"
                        fullWidth
                        type="text"
                        value={formik.values[section][name]}
                        onChange={formik.handleChange}
                    />
                </Box>
            );
    }
};

export default AgentConfigField;
