import React, { useEffect, useState, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTodo, add_todo, all_delete, del_todo, DONE_LIST, check_list } from './todoSlice';
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
// import verify from '../api/verify'

// export function Login() {
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
    const [idToken, setIdToken] = useState('')
    const [currentUser, setCurrentUser] = useState('');
    const myLiffId = "1656149559-xXM4l4Gp"
    const { globalState, setGlobalState } = useContext(Store)

    // function initializeLiff(myLiffId) {
    //     liff
    //         .init({
    //             liffId: myLiffId
    //         })
    //         .then(() => {
    //             // start to use LIFF's api
    //             initializeApp();
    //         })
    //         .catch((err) => {
    //             document.getElementById("liffAppContent").classList.add('hidden');
    //             document.getElementById("liffInitErrorMessage").classList.remove('hidden');
    //         });
    // };

    //     // Promiseオブジェクトを使用する方法

    // if (!liff.isLoggedIn()) {
    //     // LIFFログインしていなかったらリダイレクト
    //     history.push('/');
    //     return;
    // }
    window.onload = function (e) {
        liff
            .init({ liffId: myLiffId })
            .then(() => {
                // 初期化完了
                // initializeApp();
            })
    };
    function initializeApp() {
        // ログインチェック
        if (liff.isLoggedIn()) {
            //ログイン済
            getLineData();
            history.push('/Main')
        } else {
            // 未ログイン
            let result = window.confirm("LINE Loginしますか？");
            if (result) {
                liff.login();
            }
        }
    }
    function getLineData() {
        liff.getProfile()
            .then(profile => {

                firebase.auth()
                    .onAuthStateChanged(user => {
                        if (user) {
                            setCurrentUser(user);
                        } else {
                            // 作成したapiにidトークンをpost
                            fetch('/api/verify', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    idToken: liff.getIDToken(),
                                }),
                            }).then(response => {
                                response.text().then(data => {
                                    firebase.auth()
                                        .signInWithCustomToken(data).then(profile => {
                                            const user = profile.userId;
                                            console.log(user);
                                        });
                                });
                            });
                        }
                    });
                db.collection('users').doc(`${profile.userId}`).set({
                    name: profile.userId,
                    nName: profile.displayName,
                    avatar: profile.pictureUrl,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                const nName = (profile.displayName)
                const name = (profile.userId)
                const avatar = (profile.pictureUrl)
                history.push(`/Main/${nName}`)
                // ...
                setGlobalState({
                    type: USER_LINE,
                    nName,
                    name,
                    avatar
                });
                console.log("ユーザーのid:" + globalState.userId);
                console.log("ユーザーの名前:" + globalState.displayName);
                console.log("ユーザーの画像URL:" + globalState.pictureUrl);
                console.log(globalState.nName);

                history.push(`/Main/${nName}`)
            })
    }







    // useEffect(() => {
    //     firebase.auth()
    //         .onAuthStateChanged(user => {
    //             if (user) {
    //                 setCurrentUser(user);
    //             } else {
    //                 // 作成したapiにidトークンをpost
    //                 fetch('/api/verify', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         idToken: liff.getIDToken(),
    //                     }),
    //                 }).then(response => {
    //                     response.text().then(data => {
    //                         // 返ってきたカスタムトークンでFirebase authにログイン
    //                         firebase.auth()
    //                             .signInWithCustomToken(data).then(response => {
    //                                 const user = response.user;
    //                                 setCurrentUser(user);
    //                             });
    //                     });
    //                 });
    //             }
    //         });
    // }, []);
    // // コールバックを使用する方法
    // liff.init({ liffId: "1656149559-xXM4l4Gp" }, successCallback, errorCallback);




    // useEffect(() => {
    // if (!liff.isLoggedIn()) {
    //     // LIFFログインしていなかったらリダイレクト
    //     history.push('/');
    //     return;
    // }
    //     firebase.auth()
    //         .onAuthStateChanged(user => {
    //             if (user) {
    //                 setCurrentUser(user);
    //             } else {
    //                 // 作成したapiにidトークンをpost
    //                 fetch('/api/verify', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         idToken: liff.getIDToken(),
    //                     }),
    //                 }).then(response => {
    //                     response.text().then(data => {
    //                         // 返ってきたカスタムトークンでFirebase authにログイン
    //                         firebase.auth()
    //                             .signInWithCustomToken(data).then(response => {
    //                                 const user = response.user;
    //                                 setCurrentUser(user);
    //                             });
    //                     });
    //                 });
    //             }
    //         });
    // }, []);



    // React.useEffect(() => {
    //     const fn = async () => {
    //         await liff.init({ liffId })
    //         if (!liff.isLoggedIn()) {
    //             liff.login()
    //         }
    //         const idToken = liff.getIDToken()
    //         setIdToken(idToken)
    //         console.log(idToken)
    //         setSignInFinished(true)
    //     }
    //     fn()
    // }, [])
    const googleClick = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().languageCode = 'jp';
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                const nameG = (result.user?.displayName)
                setNameG(`${nameG}`)
                const avatarG = (result.user?.photoURL)
                setAvatar(`${avatarG}`)
                console.log(avatar)
                setNName(nameG)
                const uid = (result.user?.uid)
                setName(`${uid}`)
                console.log(`${uid}`)
                db.collection('users').doc(`${uid}`).set({
                    name: result.user?.uid,
                    nName: `${nameG}`,
                    avatar: `${avatar}`,
                    // avatarG: `${avatarG}`,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                    .then((docref) => {
                        console.log("Document successfully written!:", `${name}`);
                    })
                    .catch((error) => {
                        console.error("Error writing document: ");
                    })
                history.push('/Main')
            });
    }
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
                            {/* <a href=
                                'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656149559&redirect_uri=https://twitter-app-eriko.web.app/main&state=12345abcde&scope=profile%20openid&nonce=09876xyz'
                                style={{ textDecoration: "none" }}> */}
                            {/* <a href=
                                'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656149559&redirect_uri=http://localhost:3000/main&state=11656149559-xXM4l4Gp&scope=profile%20openid&nonce=09876xyz'
                                style={{ textDecoration: "none" }}> */}
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={initializeApp}
                                className={classes.green}
                            >
                                lineでLogin
                                </Button>
                            {/* </a> */}
                        </Typography>
                        <Typography>
                            <h3> </h3>
                        </Typography>
                        <Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={googleClick}
                                color="primary"
                            >
                                googleでLogin
                         </Button>
                        </Typography>
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
