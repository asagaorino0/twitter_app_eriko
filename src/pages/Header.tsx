import React, { useState, useContext } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';

const Header = () => {
    // const useStyles = makeStyles((theme) => ({
    //     paper: {
    //         marginTop: theme.spacing(4),
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //     },
    //     avatar: {
    //         margin: theme.spacing(7),
    //     },
    //     form: {
    //         width: '100%', // Fix IE 11 issue.
    //         marginTop: theme.spacing(1),
    //     },
    //     submit: {
    //         margin: theme.spacing(3, 0, 2),
    //     },
    //     red: {
    //         color: 'red',
    //     },
    // }));
    // const classes = useStyles();
    const [avatar, setAvatar] = useState<string>('');
    const [nameG, setNameG] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const history = useHistory()
    //現在ログインしているユーザーを取得する
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // console.log(user)
            const nameG = (user?.displayName)
            setNameG(`${nameG}`)
            console.log(`${nameG}`)
            const avatarG = (user?.photoURL)
            setAvatar(`${avatarG}`)
            const email = (user?.email)
            console.log(email)
            setEmail(`${email}`)
        } else {
            // No user is signed in.
        }
    });
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // setName('')
            setNameG('')
            setAvatar('')
            // setEmail('')
            // setPassword('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;

        });
    }
    return (
        <div>
            {nameG !== 'null' && (
                <Toolbar>
                    {avatar.length !== 0 && (
                        <img
                            src={`${avatar}`}
                            alt=""
                            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                        />
                    )}
                    <h3>{`${nameG}さん！ようこそ！！`}</h3>

                </Toolbar>
            )}
            {email.length !== 0 && (
                <Toolbar>
                    {/* {avatar.length !== 0 && (
                        <img
                            src={`${avatar}`}
                            alt=""
                            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                        />
                    )} */}
                    <h3>{`${email}さん！ようこそ！！`}</h3>

                </Toolbar>
            )}
            <AppBar position="static">
                {nameG.length !== 0 && (
                    <Toolbar>
                        <Button variant="contained" onClick={signOut}>
                            Logout
            </Button>
                        <br />
                    </Toolbar>
                )}
            </AppBar>

        </div>
    )
}

export default Header