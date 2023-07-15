import React from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box} from '@mui/material';
import {useEffect, ReactElement} from 'react';
import {Grid} from '@mui/material';

import MultipleValuesAutocomplete from "src/components/forms/form-elements/autoComplete/MultipleValuesAutocomplete";
import {supabase} from 'src/supabase/supabase';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomOutlinedInput from 'src/components/forms/theme-elements/CustomOutlinedInput';

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
        setTags(tags.map(tag => ({title: tag.tag})));
    }, [])


    return (
        <div>
            <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
                Customize
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
            >
                <DialogTitle>Customize your feed</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Personalize your feed and filter out the noise
                    </DialogContentText>
                    <Box mt={2}>
                        <Grid container spacing={3}>
                            {/* 1 */}
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="bl-name" sx={{mt: 0, mb: {xs: '-10px', sm: 0}}}>
                                    Story type
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <MultipleValuesAutocomplete
                                    options={tags}
                                    label="Announcements, listings, hacks...">
                                </MultipleValuesAutocomplete>
                            </Grid>
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="bl-name" sx={{mt: 0, mb: {xs: '-10px', sm: 0}}}>
                                    Topics
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <MultipleValuesAutocomplete
                                    options={tags}
                                    label={"Bitcoin ETF filings, Bitcoin halving..."}>
                                </MultipleValuesAutocomplete>
                            </Grid>
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="bl-name" sx={{mt: 0, mb: {xs: '-10px', sm: 0}}}>
                                    Entities
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <MultipleValuesAutocomplete
                                    label={"Assets, people, organizations, exchanges..."}
                                    options={tags}>
                                </MultipleValuesAutocomplete>
                            </Grid>
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="bl-name" sx={{mt: 0, mb: {xs: '-10px', sm: 0}}}>
                                    Sentiment
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <MultipleValuesAutocomplete
                                    label={"Positive, negative"}
                                    options={tags}>
                                </MultipleValuesAutocomplete>
                            </Grid>
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="bl-name" sx={{mt: 0, mb: {xs: '-10px', sm: 0}}}>
                                    Emotions
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <MultipleValuesAutocomplete
                                    label={"Joy, Anger..."}
                                    options={tags}>
                                </MultipleValuesAutocomplete>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
