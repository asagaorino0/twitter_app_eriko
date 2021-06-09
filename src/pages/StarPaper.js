import React, { useContext } from 'react';
import { Store } from '../store/index'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase/app"
import StarIcon from '@material-ui/icons/Star';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import Badge from '@material-ui/core/Badge';
// import { USER_PRO } from '../actions/index'
// import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: 'spacing(0, 3)',
        backgroundColor: '#fff',
    },
    paper: {
        maxWidth: 400,
        margin: '5px 0px 5px 0px ',
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
    largePink: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        fontSize: '100px',
        color: '#fff',
        backgroundColor: 'pink',
    },
}));

export default function SimplePaper({ messages }) {
    // const { globalState, setGlobalState } = useContext(Store)
    // const history = useHistory()
    const classes = useStyles();
    const db = firebase.firestore();
    const doc = firebase.firestore();
    // const deleteId = async () => {
    //     console.log('messages:', doc.id)
    //     await
    //         db.collection("messages").doc(`${messages.id}`).delete()
    // };
    const [count, setCount] = React.useState(1)
    const starId = async () => {
        const countS = messages.star
        setCount(countS + 1);
        await
            db.collection("messages").doc(messages.id).set({
                star: count,
            }, { merge: true }//←上書きされないおまじない
            )
        console.log('strar:', messages.star)
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={3}>
                {messages.avaterUrl === "0" &&
                    <Grid item>
                        <Avatar className={classes.pink} onClick={handleClick} >{messages.avater} </Avatar>
                    </Grid>
                }
                {messages.avaterUrl !== "0" &&
                    <Grid item>
                        <img src={messages.avaterUrl} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                    </Grid>
                }
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
                <StarIcon className={classes.yellow} onClick={starId} />
                <Badge badgeContent={messages.star} />
            </Grid>
            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {messages.avaterUrl === "0" &&
                        <MenuItem onClick={handleClose} >
                            <Avatar className={classes.largePink}>{messages.avater} </Avatar>
                        </MenuItem>
                    }
                    {messages.avaterUrl !== "0" &&
                        <MenuItem onClick={handleClose}>
                            <img src={messages.avaterUrl} alt="" style={{ borderRadius: '50%', width: '180px', height: '180px' }} />
                        </MenuItem>
                    }
                    <MenuItem onClick={handleClose}>{messages.name}</MenuItem>
                </Menu>
            </div>
        </Paper>
    );
}
