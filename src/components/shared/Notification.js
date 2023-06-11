// Notification.js
import React from 'react';
import {Snackbar, Alert, AlertTitle} from '@mui/material';

const Notification = ({open, handleClose, severity, title, message}) => {
    return (
        <Snackbar open={open}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  transitionDuration={500}
        >
            <Alert sx={{
                minWidth: '250px',
                width: '100%',
                color: 'white',
                backgroundColor: (theme) => theme.palette.background.default,
                border: (theme) => `solid 1px ${theme.palette[severity].main}`
            }}
                   onClose={handleClose} severity={severity} variant="filled">
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
