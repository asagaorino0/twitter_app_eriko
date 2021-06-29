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
// const AvatarMenu = () => {
export default function SimplePaper({ messenger }) {
    // const { globalState, setGlobalState } = useContext(Store)
    // const history = useHistory()
    const classes = useStyles();
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const follower = firebase.firestore();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [star, setStar] = useState('');

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
        //     await
        //         db.collection("messenger").doc(messenger.id).collection('follower').where("followerName", "===", name)
        //             .get()
        //             .then((querySnapshot) => {
        //                 console.log("消したよ ")
        //                 querySnapshot.forEach((doc) => {
        //                     console.log(querySnapshot)
        //                     doc.ref.delete();
        //                 })
        //             })
        //  .catch(() => {
        await
            db.collection("messenger").doc(messenger.id).collection('follower').doc(name).set({
                follower: `${avatar}`,
                followerName: `${name}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない

            )
        db.collection(name).doc(messenger.id).set({
            id: messenger.id,
            name: messenger.name,
            message: messenger.message,
            src: messenger.src,
            avatar: messenger.avatar,
            avatarG: messenger.avatarG,
            time: messenger.time,
            insta: messenger.insta,
            del: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then((docRef) => {
                console.log("Document written with ID: ");
            })
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection("messenger")
            .doc(messenger.id)
            .collection('follower')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const followers = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setFollowers(followers);
            })

    }, []
    );

    const [followers, setFollowers] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorMl, setAnchorMl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleFollower = (event) => {
        setAnchorMl(event.currentTarget);
        // console.log(messenger.follower.length)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorMl(null);
    };

    return (
        <Menu
            id="simple-menu"
            anchorMl={anchorMl}
            keepMounted
            open={Boolean(anchorMl)}
            onClose={handleClose}
        >
            {/* < Paper className={classes.paper} >
                <Grid container wrap="nowrap" spacing={1} >
                    {messenger.avatarG === "" &&
                        <Grid item >
                            <Avatar className={classes.pink} onClick={handleClick} >{messenger.avatar} </Avatar>
                            <Link href={messenger.insta} underline="none" target="_blank">
                                {`${messenger.insta}`.length !== 0 &&
                                    <InstagramIcon alt="insta" color="disabled" />
                                }
                            </Link>
                        </Grid>
                    }
                    {messenger.avatarG !== "" &&
                        <Grid item>
                            <img src={messenger.avatarG} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                            <Link href={messenger.insta} underline="none" target="_blank">
                                {`${messenger.insta}`.length !== 0 &&
                                    <InstagramIcon alt="insta" color="disabled" />
                                }
                            </Link>
                        </Grid>
                    }
                    <Grid item xs>
                        <Typography variant="h6" component="h6">
                            {messenger.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {messenger.message}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            <img src={messenger.src} alt="" style={{ width: '80px', height: 'auto' }} />
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {messenger.time}
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
                </Grid>
                <div>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {messenger.avatarG === "" &&
                            <MenuItem onClick={handleClose} >
                                <Avatar className={classes.largePink}>{messenger.avatar} </Avatar>
                            </MenuItem>
                        }
                        {messenger.avatarG !== "" &&
                            <MenuItem onClick={handleClose}>
                                <img src={`${messenger.avatarG}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                            </MenuItem>
                        } */}
            <MenuItem onClick={handleClose}>{`${messenger.name}`}</MenuItem>
            {/* </Menu>
                </div>
            </Paper > */}
        </Menu>
    );
}
