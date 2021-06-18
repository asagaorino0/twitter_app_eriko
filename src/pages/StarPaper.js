import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Store } from '../store/index'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase/app"
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InstagramIcon from '@material-ui/icons/Instagram';
import Follower from './Follower'
// import Badge from '@material-ui/core/Badge';
// import { USER_PRO } from '../actions/index'
// import { useHistory } from 'react-router-dom';
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
    pos: {
        marginBottom: 0,
    },
    pink: {
        color: '#fff',
        backgroundColor: 'pink',
    },
    followPink: {
        color: '#fff',
        backgroundColor: 'pink',
        fontSize: '10px',
        borderRadius: '50%',
        width: '20px',
        height: '20px'
    },
    yellow: {
        color: 'yelloW',
        // backgroundColor: 'yelloW',
    },
    largePink: {
        width: '40px',
        height: '40px',
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
    const follower = firebase.firestore();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [star, setStar] = useState('');
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

    // const starId = async () => {
    //     // console.log(name, followers.followerName)
    //     await
    //         db.collection("messages").doc(messages.id).collection('follower').where("followerName", "==", name)
    //             .get()
    //             .then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.delete();
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.error("keshitenaiyo ", error)
    //                 // await
    //                 db.collection("messages").doc(messages.id).collection('follower').doc(name).set({
    //                     follower: `${avatar}`,
    //                     followerName: `${name}`,
    //                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //                 }, { merge: true }//←上書きされないおまじない
    //                 )
    //             })
    // }

    const starId = async () => {
        // if ([db.collection("messages").doc(messages.id).collection('follower')].indexOf(name) !== -1)
        //     await
        //         db.collection("messages").doc(messages.id).collection('follower').where("followerName", "===", name)
        //             .get()
        //             .then((querySnapshot) => {
        //                 console.log("消したよ ")
        //                 querySnapshot.forEach((doc) => {
        //                     console.log(querySnapshot)
        //                     doc.ref.delete();
        //                 })
        //             })
        // // .catch(() => {
        // else {
        if ([db.collection("messages").doc(messages.id).collection('follower')].indexOf(name) !== -1)
            console.log("keshitenaiyo ")
        await
            db.collection("messages").doc(messages.id).collection('follower').doc(name).set({
                follower: `${avatar}`,
                followerName: `${name}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない

            )
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .doc(messages.id)
            .collection('follower')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const followers = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                    // doc.data().timestamp.toDate()
                });
                setFollowers(followers);
            })

    }, []
    );

    const [followers, setFollowers] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorFl, setAnchorFl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFollower = (event) => {
        setAnchorFl(event.currentTarget);
        console.log(messages.follower.length)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorFl(null);
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
                    <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                        {followers.length === 0 &&
                            <StarBorderIcon className={classes.yellow} onClick={starId} />}
                        {followers.length !== 0 &&
                            <StarIcon className={classes.yellow} onClick={starId} />}
                        {followers.length !== 0 &&
                            followers.map((followers, index) => {
                                return (
                                    <div>
                                        <Follower followers={followers} key={followers.id} />
                                    </div>
                                )
                            })
                        }
                    </Grid>

                </Grid>
                <Grid item>
                    <DeleteIcon color="disabled" onClick={deleteId} />
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
        </Paper >
    );
}
