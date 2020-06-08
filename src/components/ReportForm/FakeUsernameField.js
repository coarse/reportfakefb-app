import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import { DeleteEntryButton } from './Buttons.js';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    field: {
        margin: theme.spacing(1, 0, 1, 2),
    },
}));

const FakeUsernameField = ({index, sending, username, handleChange, handleDelete}) => {
    const classes = useStyles();

    return (
        <>
            <FormControl className={classes.field}>
                <InputLabel
                    htmlFor={`fake-username-${index}`}
                    shrink={true} >
                    Link/Username #{`${index + 1}`}
                </InputLabel>
                <Input
                    id={`fake-username-${index}`}
                    value={username}
                    onChange={(event) => handleChange(index, event.target.value)} />
            </FormControl>
            {
                (index > 0) ? (
                    <DeleteEntryButton disabled={sending} onClick={() => handleDelete(index)} />
                ) : ''
            }
        </>
    );
};

export default FakeUsernameField;