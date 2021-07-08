import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from "firebase/app";
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';

export default function SimplePaper({ followers }) {
    // const [anchorFl, setAnchorFl] = React.useState(null);
    // const handleFollower = (event) => {
    //     setAnchorFl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorFl(null);
    // };
    const [user, setUser] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(`${user.bunno1}`.toString())
        firebase
            .firestore()
            .collection("users")
            .where("name", "==", `${followers.uid}`)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data())
                    setUser(doc.data())
                })
            })
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="flex-top" style={{ cursor: 'pointer' }}>
                <img src={followers.follower} alt="" style={{ borderRadius: '50%', width: '30px', height: '30px' }} onClick={handleClick} />
            </Grid>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                fullWidth={true}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ whiteSpace: "pre-wrap" }}
            >
                <MenuItem
                    onClick={handleClose}
                >
                    <img src={`${followers.follower}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                </MenuItem>
                <MenuItem>
                    <Grid item>
                        {/* <img src={messages.avatar} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} /> */}
                        <Link href={user.insta} underline="none" target="_blank">
                            {`${user.insta}`.toString() !== 'undefined' &&
                                <InstagramIcon alt="insta" color="disabled" />
                            }
                        </Link>
                    </Grid>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                >{`${followers.followerName}`}</MenuItem>
                {`${user.nameY}`.toString() !== 'undefined' &&
                    <MenuItem
                        onClick={handleClose}
                    >{`${user.nameY}`}
                    </MenuItem>
                }
                {`${user.bunno1}`.toString() !== 'undefined' &&
                    <MenuItem
                        style={{ whiteSpace: "pre-wrap" }}
                        onClick={handleClose}
                    > {`${user.bunno1}`
                        }
                    </MenuItem>
                }
            </Menu>
        </div >
    )
}
