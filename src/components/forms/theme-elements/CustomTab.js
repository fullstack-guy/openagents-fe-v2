import React from 'react';
import {Tab} from '@mui/material';

const CustomTab = ({label, index, ...props}) => (
    <Tab
        key={index}
        label={label}
        value={index}
        sx={(theme) => ({
            px:5,
            py:2,
            borderBottom: '2px solid transparent',
            ":hover, :focus, :active": {
                borderBottom: '2px solid ' + theme.palette.primary.main,
            },

        })}
        {...props}
    />

);

export default CustomTab;
