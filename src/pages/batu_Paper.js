import React, { useState, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/app"
import InstagramIcon from '@material-ui/icons/Instagram';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

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
    },
    pos: {
        marginBottom: 10,
    },
    largePink: {
        width: 'spacing(20)',
        height: 'spacing(20)',
        fontSize: '40px',
        color: '#fff',
        backgroundColor: 'pink',
    },
}));

export default function SimplePaper({ messages }) {
    const classes = useStyles();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const deleteId = async () => {
        console.log('messages:', doc.id)
        await
            db.collection("messages").doc(`${messages.id}`).delete()
    };
    //現在ログインしているユーザーを取得する
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const avatarG = (user?.photoURL)
            if (`${avatarG}` === 'null') {
                const email = (user?.email)
                setAvatar(`${email}`.charAt(0))
            }
            else {
                setAvatar(`${avatarG}`)
            }
            const nameG = (user?.displayName)
            if (`${nameG}` !== 'null') {
                setName(`${nameG}`)
            } else {
                const email = (user?.email)
                setName(`${email}`)
            }
        }
    })
    const starId = async () => {
        console.log('id:', `${avatar}`)
        await
            db.collection("messages").doc(messages.id).update({
                star: (1),
            }, { merge: true }//←上書きされないおまじない
            )
        await
            db.collection("messages").doc(messages.id).collection('follower').doc(name).set({
                follower: `${avatar}`,
                followerName: `${name}`
            }, { merge: true }//←上書きされないおまじない
            )
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        < Paper className={classes.paper} >
            <Grid container wrap="nowrap" spacing={1} >
                {messages.avatarG === "" &&
                    <Grid item >
                        <Avatar className={classes.pink} onClick={handleClick} >{messages.avatar} </Avatar>
                        <Link href={messages.insta} underline="none" target="_blank">
                            {`${messages.insta}`.length !== 0 &&
                                <InstagramIcon alt="insta" color="disabled" />
                            }
                        </Link>
                    </Grid>
                }
                {messages.avatarG !== "" &&
                    <Grid item>
                        <img src={messages.avatarG} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                        <Link href={messages.insta} underline="none" target="_blank">
                            {`${messages.insta}`.length !== 0 &&
                                <InstagramIcon alt="insta" color="disabled" />
                            }
                        </Link>
                    </Grid>
                }
                <Grid item xs>
                    <Typography variant="h6" component="h6">
                        {messages.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {messages.message}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <img src={messages.src} alt="" style={{ width: '80px', height: 'auto' }} />
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {messages.time}
                    </Typography>
                    <Typography >
                        <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                            <StarBorderIcon className={classes.yellow} onClick={starId} />
                        </Grid>
                    </Typography>
                </Grid>
            </Grid>
            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {messages.avatarG === "" &&
                        <MenuItem onClick={handleClose} >
                            <Avatar className={classes.largePink}>{messages.avatar} </Avatar>
                        </MenuItem>
                    }
                    {messages.avatarG !== "" &&
                        <MenuItem onClick={handleClose}>
                            <img src={`${messages.avatarG}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                        </MenuItem>
                    }
                    <MenuItem onClick={handleClose}>{`${messages.name}`}</MenuItem>
                </Menu>
            </div>
        </Paper>
    );
}
