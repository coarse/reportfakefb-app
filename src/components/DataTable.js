import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const moment = require('moment-timezone');

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
    button: {
        margin: theme.spacing(0.5, 1, 0.5, 0)
    },
}));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '1 1 100%',
    },
}));

const TableToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Reported Fake Accounts
            </Typography>
        </Toolbar>
    );
};

export default function CustomPaginationActionsTable({accounts, handleFetch}) {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const rows = accounts;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (rows.length < 1 ? 1 : rows.length) - page * rowsPerPage);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(handleFetch, []);

    return (
        <>
            <TableToolbar />
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>FB Username</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Date Reported</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (!rows || rows.length <= 0)
                            ? (
                                <>
                                    <TableRow></TableRow>
                                    <TableRow></TableRow>
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No data to show.
                                        </TableCell>
                                    </TableRow>
                                    <TableRow></TableRow>
                                    <TableRow></TableRow>
                                </>
                            ) : (
                                (
                                    (rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    component={RouterLink}
                                                    color="inherit"
                                                    to={`/${row.id}`} >
                                                    { row.username }
                                            </Link>
                                            </TableCell>
                                            <TableCell style={{ width: 300 }} align="right">
                                                <Button
                                                    className={classes.button}
                                                    component={RouterLink}
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    to={`/${row.id}`} >
                                                    View Details
                                                </Button>
                                                <Button
                                                    className={classes.button}
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    href={`https://facebook.com/${row.username}`}
                                                    target="_blank" >
                                                    Facebook
                                                </Button>
                                                {/* {row.calories} */}
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="right">
                                                { moment(row.created_at).tz('Asia/Singapore').format('MM/DD/YY hh:mm a') }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                            )
                    }

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>  
            </Table>
        </>
    );
}
