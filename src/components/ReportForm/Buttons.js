import React from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    send: {
        margin: theme.spacing(0, 0, 2, 2),
    },
    entry: {
        margin: theme.spacing(2, 0, 2, 2),
    }
}));

export const AddEntryButton = ({disabled, onClick}) => {
    const classes = useStyles();
    
    return (
        <Button
            className={classes.entry}
            color="secondary"
            variant="contained"
            size="small"
            disabled={disabled}
            onClick={onClick} >
            Add Entry
        </Button>
    );
};

export const DeleteEntryButton = ({disabled, onClick}) => {
    const classes = useStyles();
    
    return (
        <Button
            className={classes.entry}
            color="primary"
            variant="contained"
            size="small"
            disabled={disabled}
            onClick={onClick} >
            Delete Entry
        </Button>
    );
};

export const SendButton = ({disabled, onClick}) => {
    const classes = useStyles();
    
    return (
        <Button
            className={classes.send}
            color="primary"
            variant="contained"
            size="small"
            disabled={disabled}
            onClick={onClick} >
            Send Report
        </Button>
    );
};