import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../styling.js';

import DataTable from '../components/DataTable.js';

export default function Home({accounts, handleFetch}) {
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <DataTable accounts={accounts} handleFetch={handleFetch} />
            </Paper>
        </Grid>
    );
}