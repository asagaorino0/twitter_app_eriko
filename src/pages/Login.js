import React, { useState, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTodo, add_todo, all_delete, del_todo, DONE_LIST, check_list } from './todoSlice';
// import Checkbox from '@material-ui/core/Checkbox';
import styles from './Counter.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import logo from '../img/0730.jpg';


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
                                'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656149559&redirect_uri=https://twitter-app-eriko.web.app/&state=12345abcde&scope=profile%20openid&nonce=09876xyz'
                                style={{ textDecoration: "none" }}> */}
                            <a href=
                                'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656149559&redirect_uri=http://localhost:3000/main&state=12345abcde&scope=profile%20openid&nonce=09876xyz'
                                style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    // onClick={LineClick}
                                    className={classes.green}
                                >
                                    lineでLogin
                                </Button>
                            </a>
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
