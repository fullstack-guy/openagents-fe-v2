import React from 'react';
import { Tab } from '@mui/material';

const CustomTab = ({ label, index, ...props }) => (
    <Tab
        key={index}
        label={label}
        value={index}
        sx={(theme) => ({
            backgroundColor: (tabProps) => (tabProps.selected ? 'white' : 'inherit'),
            borderBottom: `1px solid ${theme.palette.divider}`,
            ":hover": {
                bgcolor: theme.palette.primary.light,
            },
        })}
        {...props}
    />
);

export default CustomTab;
