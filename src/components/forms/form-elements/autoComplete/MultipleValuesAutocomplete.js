import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
// custom
import CustomTextField from '../../theme-elements/CustomTextField';
// Top 100 films as rated by IMDb users.
const top100Films = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972}
];

const MultipleValuesAutocomplete = ({options,
                                    placeholder,
                                    label}) => (
    <Autocomplete
        multiple
        fullWidth
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option.title}
        defaultValue={[]}
        filterSelectedOptions
        renderInput={(params) => (
            <CustomTextField label={label} {...params} placeholder={placeholder} />
        )}
    />
);


export default MultipleValuesAutocomplete;
