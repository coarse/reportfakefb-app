import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import SectionTitle from './SectionTitle.js';
import RealUsernameField from './RealUsernameField.js';
import FakeUsernameField from './FakeUsernameField.js';
import { AddEntryButton, SendButton } from './Buttons.js';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        outline: 0,
        borderRadius: 4,
        boxShadow: theme.shadows[5],
        '& > hr': {
            margin: theme.spacing(0, 2, 2, 2)
        },
    },
    title: {
        margin: theme.spacing(2),
    }
}));

const ReportForm = ({fakes, real, sending, handleChangeReal, handleAdd, handleChangeFake, handleDelete, handleSend}) => {
    const classes = useStyles();

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <Typography className={classes.title} variant="h6">Report Form</Typography>
            <SectionTitle text="Real Account Details" />
            <RealUsernameField value={real} handleChange={handleChangeReal} />
            <Divider />
            <SectionTitle text="Fake Accounts" />
            {
                fakes.map(
                    (username, index) => (
                        <FakeUsernameField
                            key={index}
                            index={index}
                            sending={sending}
                            username={username}
                            handleChange={handleChangeFake}
                            handleDelete={handleDelete}
                        />
                    )
                )
            }
            <AddEntryButton disabled={sending} onClick={handleAdd} />
            <Divider />
            <SendButton disabled={sending} onClick={handleSend} />
        </form>
    );
};

export default ReportForm;