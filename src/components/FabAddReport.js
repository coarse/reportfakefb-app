import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        zIndex: theme.zIndex.modal + 1,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const FabAddReport = ({open, handleClick}) => {
    const classes = useStyles();

    return (
        <Fab
            className={classes.fab}
            variant={open ? 'round' : 'extended'}
            color={open ? 'primary' : 'secondary'}
            onClick={handleClick} >
            { open ? (<CloseIcon />) : (
                <>
                    <AddIcon className={classes.extendedIcon} />
                    Add Report
                </>
            ) }
        </Fab>
    );
};

export default FabAddReport;