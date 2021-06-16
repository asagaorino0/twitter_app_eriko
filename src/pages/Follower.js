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
import InstagramIcon from '@material-ui/icons/Instagram';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import Badge from '@material-ui/core/Badge';
// import { USER_PRO } from '../actions/index'
// import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';


// const Follower = () => {

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

export default function SimplePaper({ followers }) {
    // const { globalState, setGlobalState } = useContext(Store)
    // const history = useHistory()
    const classes = useStyles();
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const messages = firebase.firestore();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    // const deleteId = async () => {
    //     console.log('messages:', doc.id)
    //     await
    //         db.collection("messages").doc(`${messages.id}`).delete()
    // };
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
    // const [count, setCount] = useState(1)
    // const [followers, setFollowers] = useState('');

    // const starId = async () => {
    //     await
    //         db.collection("messages").doc(messages.id).collection('follower').add({
    //             follower: `${avatar}`,
    //             followerName: `${name}`
    //         })
    //             .then((docref) => {
    //                 console.log("Document successfully written!:", docref.id);
    //                 setFollowers(docref)
    //             })
    //             .catch((error) => {
    //                 console.error("Error writing document: ", error);
    //             })
    // }



    //     firebase
    //         .firestore()
    //         .collection("messages")
    //         .doc(messages.id)
    //         .collection('follower')
    //         // .orderBy("timestamp", "desc")
    //         .onSnapshot((snapshot) => {
    //             const followers = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data()
    //                 // doc.data().timestamp.toDate()
    //             });
    //             setFollowers(followers);
    //             console.log(followers)
    //         })
    // }

    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorFl, setAnchorFl] = React.useState(null);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    const handleFollower = (event) => {
        setAnchorFl(event.currentTarget);
        console.log(followers.length)
        console.log(followers.follower)
        console.log(followers.followerName)
    };
    const handleClose = () => {
        // setAnchorEl(null);
        setAnchorFl(null);
    };

    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                {`${followers.follower}`.length !== 1 &&
                    <img src={followers.follower} alt="" style={{ borderRadius: '50%', width: '20px', height: '20px' }} onClick={handleFollower} />
                }
                {`${followers.follower}`.length === 1 &&
                    <Avatar className={classes.followPink} onClick={handleFollower}  >{followers.follower} </Avatar>
                }
            </Grid>
            <Menu
                id="simple-menu"
                anchorEl={anchorFl}
                keepMounted
                open={Boolean(anchorFl)}
                onClose={handleClose}
            >
                {`${followers.follower}`.length === 1 &&
                    <MenuItem onClick={handleClose} >
                        <Avatar className={classes.largePink}>{followers.follower}</Avatar>
                    </MenuItem>
                }
                {`${followers.follower}`.length !== 1 &&
                    <MenuItem onClick={handleClose}>
                        <img src={`${followers.follower}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                    </MenuItem>
                }
                <MenuItem onClick={handleClose}>{`${followers.followerName}`}</MenuItem>
            </Menu>
        </div>


    )
}


    // export default Follower;