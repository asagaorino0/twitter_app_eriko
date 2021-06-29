import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/app"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import liff from '@line/liff';

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
    const myLiffId = "1656149559-xXM4l4Gp"
    const classes = useStyles();
    const db = firebase.firestore();
    const doc = firebase.firestore();
    const messages = firebase.firestore();
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                firebase
                    .firestore()
                    .collection("users")
                    .where("name", "==", `${name}`)
                    .onSnapshot((snapshot) => {
                        const user = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data()
                        });
                        setUser(user)
                        console.log(user)
                    })
            })

    }, []
    );
    const [anchorFl, setAnchorFl] = React.useState(null);
    const handleFollower = (event) => {
        setAnchorFl(event.currentTarget);
        console.log(followers.length)
        console.log(followers.follower)
        console.log(followers.nName)
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