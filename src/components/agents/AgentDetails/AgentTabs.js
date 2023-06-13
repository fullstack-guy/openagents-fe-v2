import React from 'react';
import {Tabs, Tab, Box} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import {IconSettings, IconInfoCircle, IconDatabase, IconBolt, IconAB2} from '@tabler/icons';

const AgentTabs = () => {

    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}
             style={{
                 marginTop: "30px",
                 marginBottom: "30px",
             }}>
            <Tabs variant={"fullWidth"} value={value} onChange={handleChange} aria-label="contact details tabs"
                  sx={{width: '100%'}}>
                <Tab icon={<IconSettings/>} label="Configs" sx={{":hover": {bgcolor: 'primary.light'}}}/>
                <Tab icon={<IconDatabase/>} label="Sources" sx={{":hover": {bgcolor: 'primary.light'}}}/>
                <Tab icon={<IconBolt/>} label="Deploy" sx={{":hover": {bgcolor: 'primary.light'}}}/>
                <Tab icon={<IconAB2/>} label="Test" sx={{minWidth: 80, ":hover": {bgcolor: 'primary.light'}}}/>
            </Tabs>
        </Box>
    );
};

export default AgentTabs;
