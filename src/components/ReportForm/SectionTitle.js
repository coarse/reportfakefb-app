import React from 'react';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 2, 0, 2),
    },
}));

const SectionTitle = ({ className, text }) => {
    const classes = useStyles();
    
    return (
        <Typography
            variant="subtitle2"
            className={classes.root} >
            { text }
        </Typography>
    );
};

export default SectionTitle;