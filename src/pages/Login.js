import React, { useEffect, useState, useContext } from 'react';
import { USER_LINE } from '../actions/index'
import styles from './Counter.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import logo from '../img/0730.jpg';
import liff from '@line/liff';
import { Store } from '../store/index'

const Login = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(7),
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        red: {
            color: 'red',
        },
        green: {
            backgroundColor: '#00B900',
            color: 'white'
        },
    }));
    const classes = useStyles();
    const db = firebase.firestore();
    const [avatar, setAvatar] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const [nameG, setNameG] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    const myLiffId = "1656149559-xXM4l4Gp"
    const { globalState, setGlobalState } = useContext(Store)

    window.onload = function (e) {
        liff
            .init({ liffId: myLiffId })
            .then(() => {
                // .ready.then(() => {
                // 初期化完了
                liff.login();
                // onload();
                // initializeApp();
                //         })
                // };
                // const onload = function (e) {
                // function initializeApp() {
                // ログインチェック
                // getLineData();
                // if (liff.isLoggedIn()) {
                // console.log("ユーザーの名前:" + profile.userId);
                // if (profile.userId !== "") {
                //     //ログイン済
                //     history.push('/Main')
                // } else {
                //     // 未ログイン
                //     let result = window.confirm("LINE Loginしますか？");
                //     if (result) {
                //         liff.login();
                //         // getLineData();
                //     }
                // }
                // }

                // function initializeApp() {
                //     // ログインチェック
                //     if (liff.isLoggedIn()) {
                //         //ログイン済
                //         getLineData();
                //         history.push('/Main')
                //     } else {
                //         // 未ログイン
                //         // let result = window.confirm("LINE Loginしますか？");
                //         // if (result) {
                //         liff.login();
                //     }
                // }
                // }
                // function getLineData() {
                liff.getProfile()
                    .then(profile => {
                        setNName(profile.displayName)
                        setName(profile.userId)
                        setAvatar(profile.pictureUrl)
                        // history.push(`/Main`)
                        db.collection('users').doc(`${profile.userId}`).set({
                            name: `${profile.userId}`,
                            nName: `${profile.displayName}`,
                            avatar: `${profile.pictureUrl}`,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        // ...
                        console.log("ユーザーのid:" + profile.displayName);
                        console.log("ユーザーの名前:" + profile.userId);
                        console.log("ユーザーの画像URL:" + profile.pictureUrl);
                        console.log("{}", `${nName}`, `${avatar}`, `${name}`);
                        // history.push(`/Main`)
                        if (profile.userId !== "") {
                            //ログイン済
                            history.push('/Main')
                        } else {
                            // 未ログイン
                            let result = window.confirm("LINE Loginしますか？");
                            if (result) {
                                // liff.login();
                                // getLineData();
                            }
                        }
                    })
            })
    }


    // const googleClick = () => {
    //     var provider = new firebase.auth.GoogleAuthProvider();
    //     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //     firebase.auth().languageCode = 'jp';
    //     firebase.auth()
    //         .signInWithPopup(provider)
    //         .then((result) => {
    //             /** @type {firebase.auth.OAuthCredential} */
    //             const nameG = (result.user?.displayName)
    //             setNameG(`${nameG}`)
    //             const avatarG = (result.user?.photoURL)
    //             setAvatar(`${avatarG}`)
    //             console.log(avatar)
    //             setNName(nameG)
    //             const uid = (result.user?.uid)
    //             setName(`${uid}`)
    //             console.log(`${uid}`)
    //             db.collection('users').doc(`${uid}`).set({
    //                 name: result.user?.uid,
    //                 nName: `${nameG}`,
    //                 avatar: `${avatar}`,
    //                 // avatarG: `${avatarG}`,
    //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //             })
    //                 .then((docref) => {
    //                     console.log("Document successfully written!:", `${name}`);
    //                 })
    //                 .catch((error) => {
    //                     console.error("Error writing document: ");
    //                 })
    //             history.push('/Main')
    //         });
    // }
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setName('')
            setNameG('')
            setAvatar('')
            setEmail('')
            setPassword('')
            setError('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;
        });
    }
    return (
        <div className={classes.paper}>
            <img src={logo} style={{ borderRadius: '50%', width: '60px', height: '60px' }} alt="logo" />
            <div>
                <span className={styles.value}>konoyubi</span>
                <Typography component="h6" variant="h6">
                    介護✕美容のつながるアプリ
                </Typography>
                {nameG.length === 0 && (
                    <div>
                        <Typography>

                        </Typography>                        <Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                // onClick={onload}
                                // onClick={initializeApp}
                                className={classes.green}
                            >
                                Hello!
                                </Button>
                            {/* </a> */}
                        </Typography>

                        {/* <Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={googleClick}
                                color="primary"
                            >
                                googleでLogin
                         </Button>
                        </Typography> */}
                        {`${error}`.length !== 0 && (
                            <h6 className={classes.red}>{`${error}`}</h6>
                        )}
                    </div>
                )
                }
                {
                    nameG === "new!" && (
                        <div>
                            <Typography component="h6" variant="h6" color="primary">ユーザー登録</Typography>
                            <Typography>
                                <TextField id="email" fullWidth label="email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Typography>
                            <Typography>
                                <TextField id="password" fullWidth label="password" value={password} onChange={e => setPassword(e.target.value)} />
                            </Typography>
                            <Button variant="contained" onClick={signOut}>
                                戻る
            </Button>
                            {`${error}`.length !== 0 && (
                                <h6 className={classes.red}>{`${error}`}</h6>
                            )}
                        </div>
                    )
                }
            </div>
        </div >
    );
};

export default Login;
