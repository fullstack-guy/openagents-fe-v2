import React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box} from '@mui/material';
import {useEffect, ReactElement} from 'react';

import MultipleValuesAutocomplete from "src/components/forms/form-elements/autoComplete/MultipleValuesAutocomplete";
import {supabase} from 'src/supabase/supabase';


const FormDialog = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [tags, setTags] = React.useState([]);

    useEffect(async () => {

        let {data: tags, error} = await supabase
            .from('tags')
            .select('tag')
        setTags(tags.map(tag => ({ title: tag.tag })));
    }, [])



    return (
        <div style={{
            minWidth: '30%'
        }}>
            <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
                Customize
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Customize your feed</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Personalize your feed and filter out the noise
                    </DialogContentText>
                    <Box mt={2}>
                        <MultipleValuesAutocomplete
                            options={tags}
                            sx={{
                                width: "10px"
                            }}>
                        </MultipleValuesAutocomplete>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
