import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(2),
        '& > *': {
            marginBottom: theme.spacing(2)
        },
        '& > h5, & > h6': {
            fontWeight: 700,
        },
        '& > h5': {
            marginBottom: theme.spacing(3),
        },
        '& > h6': {
            marginBottom: theme.spacing(1),
        },
    },
    lastItem: {
        marginBottom: 0,
    },
}));

export const DataCard = ({account}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.card}>
            { (!account) ? 'Loading...' : (
                (account.username) ? (
                    <>
                        <Typography variant="h6">Account: {account.username}</Typography>
                        <Chip label="Fake" color="secondary" size="small" />
                        <Typography variant="body1">You may report this account by visiting its Facebook profile below:</Typography>
                        <Button
                            className={classes.lastItem}
                            variant="outlined"
                            color="primary"
                            size="small"
                            href={`https://facebook.com/${account.username}`} >
                            Facebook Profile
                        </Button>
                    </>
                    
                ) : (
                    <>
                        <Typography variant="h6">Facebook Account</Typography>
                        <Chip label="Real" color="primary" size="small" />
                        <Typography variant="body1">
                            Due to privacy concerns, this account may not be viewed by the public.
                            However, you may report the associated accounts in the list to the right/below.
                        </Typography>
                        <Typography className={classes.lastItem} variant="body1">
                            Additionally, this page is not listed in the home page.
                            If you wish to share this page, you may send them the link of this page.
                        </Typography>
                    </>
                )
            ) }
        </Paper>
    );
};

const ListItemLink = ({primary, to}) => {
    const CustomLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <RouterLink ref={ref} to={to} {...linkProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem component={CustomLink}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
};

export const SimilarCard = ({account}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.card}>
            { (!account) ? 'Loading...' : (
                <>
                    <Typography variant="h6">{ (account.username) ? 'Similar' : 'Related' } Fake Accounts</Typography>
                    <List className={classes.lastItem}>
                        <Divider component="li" />
                        {
                            account.similar.length < 1 ? (
                                <>
                                    <ListItem>
                                        <ListItemText primary={ 'No ' + ((account.username) ? 'similar' : 'related') + ' accounts'} />
                                    </ListItem>
                                    <Divider component="li" />
                                </>
                            ) : account.similar.map((data) => (
                                <>
                                    <ListItemLink primary={data.username} to={`/${data.id}`} />
                                    <Divider component="li" />
                                </>
                            ))
                        }
                    </List>
                </>
            ) }
        </Paper>
    );
};

export const Error404Card = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.card}>
            <Typography className={classes.header} variant="h5" align="center">404: Account not found!</Typography>
            <Typography variant="body1" align="center">You may go back to the homepage by clicking 'Home' at the top left.</Typography>
        </Paper>
    )
};