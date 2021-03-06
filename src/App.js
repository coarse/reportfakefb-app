import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import useStyles from './styling.js';

import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './routes/Home.js'
import Account from './routes/Account.js'

import Fab from './components/FabAddReport.js';
import Copyright from './components/Copyright.js';

import ReportForm from './components/ReportForm/index.js';

import api from './serverApi.js';

export default function Dashboard() {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const [real, setReal] = React.useState('');
    const [fakes, setFakes] = React.useState(['']);
    const [sending, setSending] = React.useState(false);
    const [reportError, setReportError] = React.useState(null);

    const [fakeAccounts, setFakeAccounts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [fetchError, setFetchError] = React.useState(null);

    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => {
        setOpen(false);
        clearData();
    }

    const handleFabClick = () => (open) ? handleCloseModal() : handleOpenModal();

    const handleChangeReal = (event) => setReal(event.target.value);
    
    const handleAddFakeRow = () => setFakes([...fakes, '']);
    const handleDeleteFakeRow = (index) => {
        const newFakes = [...fakes];
        newFakes.splice(index, 1);
        setFakes(newFakes);
    };

    const handleChangeFakeValue = (index, value) => {
        const newFakes = [...fakes];
        newFakes[index] = value;
        setFakes(newFakes);
    };

    const clearData = () => {
        setReal('');
        setFakes(['']);
        setSending(false);
    };

    const handleFetchData = () => {
        setLoading(true);
        fetch(api.reports.list)
            .then((res) => {
                if (res.status === 200) {
                    return Promise.resolve(res.json());
                }

                return Promise.resolve(res.json()).then((data) => {
                    return Promise.reject(data);
                });
            })
            .then((data) => {
                setFakeAccounts(data.accounts);
                setLoading(false);
            }, (error) => {
                console.error("error: ", error.message);
                setFetchError(error);
                setLoading(false);
            })
            .catch((catchError) => {
                console.error("Caught: ", catchError)
            });
    };

    const handleSendReport = () => {
        setSending(true);
        fetch(api.reports.add, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({real, fakes}),
        })
            .then((res) => {
                if (res.status === 200) {
                    return Promise.resolve(res.json());
                }

                return Promise.resolve(res.json()).then((data) => {
                    return Promise.reject(data);
                });
            })
            .then((data) => {
                handleCloseModal();
                history.push(`/${data.id}`);
            }, (error) => {
                console.error("error: ", error.message);
                setReportError(error);
                setSending(false);
            })
            .catch((catchError) => {
                console.error("Caught: ", catchError)
            });
    };

    const body = (
        <div>
            <ReportForm
                fakes={fakes}
                real={real}
                sending={sending}
                reportError={reportError}
                handleChangeReal={handleChangeReal}
                handleAdd={handleAddFakeRow}
                handleChangeFake={handleChangeFakeValue}
                handleDelete={handleDeleteFakeRow}
                handleSend={handleSendReport} />
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                <Typography
                    className={classes.title}
                    variant="h6"
                    component="h1"
                    color="inherit"
                    noWrap >
                    Report Fake FB PH   
                </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Switch>
                            <Route path="/" exact>
                                <Home
                                    accounts={fakeAccounts}
                                    loading={loading}
                                    fetchError={fetchError}
                                    handleFetch={handleFetchData} />
                            </Route>
                            <Route path="/:uuid">
                                <Account />
                            </Route>
                        </Switch>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                    <Fab open={open} handleClick={handleFabClick} />
                </Container>
            </main>
            <Modal className={classes.modal} open={open} onClose={handleCloseModal}>
                {body}
            </Modal>
        </div>
    );
}