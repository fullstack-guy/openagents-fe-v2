import * as React from 'react';
import {Snackbar, Alert, AlertTitle} from '@mui/material';

const NotificationOld = ({severity, subtitle}) => {
    const [open, setOpen] = React.useState(false);

    const title = severity.charAt(0).toUpperCase() + severity.slice(1);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            handleClick();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <React.Fragment>
            <Snackbar
                open={open}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{
                        minWidth: '250px',
                        width: '100%',
                        color: 'white',
                        backgroundColor: (theme) => theme.palette.background.default,
                        border: (theme) => `solid 1px ${theme.palette[severity].main}`
                    }
                    }
                >
                    <AlertTitle>{title}</AlertTitle>
                    {subtitle}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

export default NotificationOld;
