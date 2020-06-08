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
            <InputLabel htmlFor="real-username" shrink={true}>Username</InputLabel>
            <Input id="real-username" value={value} onChange={handleChange} />
            <FormHelperText>
                This information will not be shared to the public.
            </FormHelperText>
        </FormControl>
    );
};

export default RealUsernameField;