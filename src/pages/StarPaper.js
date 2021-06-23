import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Store } from '../store/index'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
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
import AvatarMenu from './AvatarMenu';
// import Badge from '@material-ui/core/Badge';
// import { USER_PRO } from '../actions/index'
// import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { MessageSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: 'spacing(0, 0)',
        backgroundColor: '#fff',
    },
    paper: {
        maxWidth: 400,
        margin: '5px 0px 5px 0px ',
        padding: '12px',
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
    const classes = useStyles();
    const { uid } = useParams();
    const history = useHistory()
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const follower = firebase.firestore();
    const [users, setUsers] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    // const [sid, setSid] = useState('');



    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        firebase
            .firestore()
            .collection("users").doc(`${uid}`).get().then((doc) => {
                if (doc.exists) {
                    setUsers(doc.data())
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []
    );
    const deleteId = async () => {
        console.log('messages:', messages.id)
        await
            db.collection("users").doc(`${uid}`).collection("likes").doc(`${messages.id}`).delete()
    };
    const readId = async () => {
        console.log('messages:', messages.id)
        // setSid(messages.id)
        await
            db.collection("messages").doc(messages.id).set({
                hensyu: true,
            }, { merge: true }//←上書きされないおまじない
            )
    }


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
        //  .catch(() => {
        await
            db.collection("messages").doc(messages.id).collection('follower').doc(`${uid}`).set({
                follower: `${users.avatar}`,
                followerName: `${users.nName}`,
                uid: `${uid}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        // db.collection("users").doc(`${uid}`).set({
        db.collection("users").doc(`${uid}`).collection("likes").doc(`${messages.id}`).set({
            id: messages.id,
            name: `${uid}`,
            nName: messages.nName,
            message: messages.message,
            src: messages.src,
            avatar: messages.avatar,
            time: messages.time,
            insta: messages.insta,
            myPage: true,
            like: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then((docRef) => {
                console.log("Document written with ID: ");
            })
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
                });
                setFollowers(followers)
                // console.log(followers)
            })
    }, []
    );
    // const [messages, setmessages] = useState('');
    // useEffect(() => {
    //     firebase
    //         .firestore()
    //         .collection("messages")
    //         .orderBy("timestamp", "desc")
    //         .onSnapshot((snapshot) => {
    //             const messages = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data()
    //                 // doc.data().timestamp.toDate()
    //             });
    //             setmessages(messages);
    //             console.log(messages)
    //         })
    // }, []
    // );

    const [followers, setFollowers] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorMl, setAnchorMl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMessage = (event) => {
        setAnchorMl(event.currentTarget);
        // console.log(messages.messages.length)
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorMl(null);
    };

    return (
        < Paper className={classes.paper} >
            <Grid container wrap="nowrap" spacing={1} >
                {`${messages.avatar}`.length === 1 &&
                    <Grid item >
                        <Avatar className={classes.pink} onClick={handleClick} >{messages.avatar} </Avatar>
                    </Grid>
                }
                {`${messages.avatar}`.length !== 1 &&
                    <Grid item>
                        <img src={messages.avatar} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                    </Grid>
                }
                <Grid item xs >
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} variant="h6" component="h6" >
                        {messages.event}
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        {messages.nName}
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        {messages.message}
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        <img src={messages.src} alt="" style={{ width: '80px', height: 'auto' }} />
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} variant="caption" color="textSecondary">
                        {messages.time}更新
                    </Typography>
                    {`${messages.insta}`.length !== 0 &&
                        <Link href={messages.insta} underline="none" target="_blank">
                            <h6>関連url:{messages.insta}</h6>
                        </Link>
                    }

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
                {messages.myPage === true &&
                    <Grid item>
                        <DeleteIcon color="disabled" onClick={deleteId} />
                        <button onClick={readId} color="secondary">read</button>
                    </Grid>
                }
            </Grid>

            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    fullWidth={true}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {`${messages.avatar}`.length === "" &&
                        <MenuItem onClick={handleClose} >
                            <Avatar className={classes.largePink}>{messages.avatar} </Avatar>
                        </MenuItem>
                    }
                    {`${messages.avatar}`.length !== "" &&
                        <MenuItem onClick={handleClose}>
                            <img src={`${messages.avatarG}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                        </MenuItem>
                    }
                    <MenuItem onClick={handleClose}>{`${messages.nName}`}</MenuItem>
                </Menu>
            </div>

            <div>
                <Menu
                    // id="simple-menu"
                    fullWidth={true}
                    anchorMl={anchorMl}
                    keepMounted
                    open={Boolean(anchorMl)}
                    onClose={handleClose}
                >

                    {/* < Paper className={classes.paper} > */}

                    <MenuItem onClick={handleClose}>
                        <Grid item xs>
                            <Typography variant="h6" component="h6">イベント名:
                                {messages.event}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >投稿者:
                                {messages.nName}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <img src={messages.src} alt="" style={{ width: '80px', height: 'auto' }} />
                            </Typography>
                            {/* <Typography variant="caption" color="textSecondary">
                            </Typography> */}
                            <Typography className={classes.pos} color="textSecondary" >代表者又はチーム名:
                                {messages.daihyou}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >日時:
                                {messages.nichizi}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >集合時間:
                                {messages.syugoZ}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >集合場所:
                                {messages.syugoB}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >開催場所:
                                {messages.basyo}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >募集人数:
                                {messages.ninzuu}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >施術内容:
                                {messages.menu}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >持ち物:
                                {messages.mochimono}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" >e-mail:
                                {messages.email}
                            </Typography>

                        </Grid>
                    </MenuItem>
                    {`${messages.insta}`.length !== 0 &&
                        <Link href={messages.insta} underline="none" target="_blank">
                            <h6>関連url:{messages.insta}</h6>
                        </Link>
                    }
                    <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                        {followers.length === 0 &&
                            <StarBorderIcon className={classes.yellow} onClick={starId} />
                        }
                        {followers.length !== 0 &&
                            <StarIcon className={classes.yellow} onClick={starId} />
                        }
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

                    <div>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {`${messages.avatar}`.length === 1 &&
                                <MenuItem onClick={handleClose} >
                                    <Avatar className={classes.largePink}>{messages.avatar} </Avatar>
                                </MenuItem>
                            }
                            {`${messages.avatar}`.length !== 1 &&
                                <MenuItem onClick={handleClose}>
                                    <img src={`${messages.avatar}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                                </MenuItem>
                            }
                            <MenuItem onClick={handleClose}>{`${messages.nName}`}</MenuItem>
                        </Menu>
                    </div>
                    {/* </Paper > */}
                </Menu>
            </div>
        </Paper >
    );
}
