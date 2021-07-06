
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import firebase from "firebase/app"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import liff from '@line/liff';

export default function SimplePaper({ followers }) {
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
                        console.log("forowers_user", user)
                    })
            })

    }, []
    );
    const [anchorFl, setAnchorFl] = React.useState(null);
    const handleFollower = (event) => {
        setAnchorFl(event.currentTarget);
        console.log(followers.length)
        console.log(followers.follower)
        console.log(followers.name)
    };
    const handleClose = () => {
        // setAnchorEl(null);
        setAnchorFl(null);
    };

    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <img src={followers.follower} alt="" style={{ borderRadius: '50%', width: '20px', height: '20px' }} onClick={handleFollower} />
            </Grid>
            <Menu
                id="simple-menu"
                anchorEl={anchorFl}
                keepMounted
                open={Boolean(anchorFl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <img src={`${followers.follower}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                </MenuItem>
                <MenuItem onClick={handleClose}>{`${followers.followerName}`}</MenuItem>
            </Menu>
        </div>
    )
}


    // export default Follower;