
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {'Made by '}
        <Link color="inherit" href="http://github.com/coarse">
            Michael Pio Mayol
        </Link>
        {' '}
        <>&mdash;</>
        {' Source Code: '}
        <Link color="inherit" href="https://github.com/coarse/reportfakefb-api">
            Server
        </Link>
        {' / '}
        <Link color="inherit" href="https://github.com/coarse/reportfakefb-app">
            Web App
        </Link>
    </Typography>
);