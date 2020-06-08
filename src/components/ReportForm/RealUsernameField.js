import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1, 0, 2, 2)
    },
}));

const RealUsernameField = ({value, handleChange}) => {
    const classes = useStyles();

    return (
        <FormControl className={classes.root}>
            <InputLabel htmlFor="real-username" shrink={true}>Link/Username to Real FB Account</InputLabel>
            <Input id="real-username" value={value} onChange={handleChange} />
            <FormHelperText>
                E.g. https://www.facebook.com/peioris, peioris, fb.com/peioris, peioris, https://www.facebook.com/peioris?ref=br_rs
            </FormHelperText>
            <FormHelperText>
                This information will not be shared to the public.
            </FormHelperText>
        </FormControl>
    );
};

export default RealUsernameField;