import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase/app"
// import StarIcon from '@material-ui/icons/Star';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: 'spacing(0, 3)',
        backgroundColor: '#fff',
    },
    paper: {
        maxWidth: 400,
        margin: '5px 0px 5px auto',
        padding: '16px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    pink: {
        color: '#fff',
        backgroundColor: 'pink',
    },
    green: {
        color: '#fff',
        backgroundColor: 'green',
    },
    yellow: {
        color: 'yelloW',
        // backgroundColor: 'yelloW',
    },
    pos: {
        marginBottom: 10,
    },
});

export default function SimplePaper({ messages }) {
    const classes = useStyles();
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const deleteId = async () => {
        await
            db.collection("messages").doc(`${messages.id}`).delete()
    };
    // const starId = async () => {
    //     console.log('id:', messages.id)
    //     await
    //         db.collection("messages").doc(messages.id).set({
    //             star: 1,
    //         }, { merge: true }//←上書きされないおまじない
    //         )
    //     console.log('srar:', messages.star)
    // };

    return (
        <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={0}>
                {messages.avaterUrl === "0" &&
                    <Grid item>
                        <Avatar className={classes.green}  >{messages.avater} </Avatar>
                    </Grid>
                }
                {messages.avaterUrl !== "0" &&
                    <Grid item>
                        <img src={messages.avaterUrl} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                    </Grid>
                }
                <Grid item>
                    <DeleteIcon color="disabled" onClick={deleteId} />
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h6">
                        {messages.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {messages.message}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {messages.time}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
