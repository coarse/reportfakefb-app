import React from 'react';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import useStyles from '../styling.js';

import { DataCard, SimilarCard, Error404Card } from '../components/Cards.js';

import api from '../serverApi.js';

export default function Account() {
    const classes = useStyles();
    const { uuid } = useParams();
    const location = useLocation();

    const [loading, setLoading] = React.useState(false);
    const [account, setAccount] = React.useState(undefined);
    const [error, setError] = React.useState(undefined);

    const handleLoadData = () => {
        setLoading(true);
        fetch(api.report(uuid))
            .then((res) => {
                if (res.status === 200) {
                    return Promise.resolve(res.json());
                }

                return Promise.resolve(res.json()).then((data) => {
                    return Promise.reject(data);
                });
            })
            .then((data) => {
                setAccount(data);
                setLoading(false);
            }, (error) => {
                console.error("Error: ", error);
                setError(error);
                setLoading(false);
            })
            .catch((catchError) => {
                console.error("Caught: ", catchError)
            });
    };

    React.useEffect(handleLoadData, [location]);

    return (
        <Grid item xs={12}>
            <Breadcrumbs className={classes.breadcrumbs}>
                <Link color="inherit" component={RouterLink} to="/">
                    Home
                </Link>
                <Link color="textPrimary" component={RouterLink} to={`/${uuid}`}>
                    {
                        (loading) ? 'Loading' : (
                            (error) ? 'Error' : (
                                (!account) ? 'Account' : (
                                    (account.username) ? account.username : 'Facebook Account'
                                )
                            )
                        )
                    }
                </Link>
            </Breadcrumbs>
            <Grid className={classes.grid} container spacing={4}>
                {
                    ((loading && !account) || account) ? (
                        <>
                            <Grid item xs={12} sm={6}>
                                <DataCard loading={loading} account={account}></DataCard>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SimilarCard loading={loading} account={account}></SimilarCard>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <Error404Card />
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    );
}