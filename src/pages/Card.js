import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        width: '100%',
        border: '1px solid #ccc',
        margin: '3px'
    },
    bullet: {
        // display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 10,
    },
});

export default function SimpleCard({ messages }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography >
                    {/* <img src={messages.avater} alt="" style={{ borderRadius: '50%', width: '70px', height: '70px' }} /> */}
                </Typography>
                <Typography variant="h5" component="h5">
                    {messages.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {messages.message}
                </Typography>
                {/* <Typography variant="body2" component="p">
                    {messages.avater}
                </Typography> */}
            </CardContent>
        </Card>
    );
}
