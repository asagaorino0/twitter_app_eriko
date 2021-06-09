import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
// import { LogInType } from '../types/LogInType';
import SendIcon from '@material-ui/icons/Send';
// import CreateUser from './CreateUser';
// import { NAME_GOOGLE, RESET_GOOGLE } from '../actions/index'
// import { Store } from '../store/index'
// import StarIcon from '@material-ui/icons/Star';
// import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import logo from '../img/0527.jpg';
// import CssBaseline from '@material-ui/core/CssBaseline';

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
    }));
    const classes = useStyles();
    const [avatar, setAvatar] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [nameG, setNameG] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const history = useHistory()
    // const { globalState, setGlobalState } = useContext(Store)

    const handleClick = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('success login')
                const name = (userCredential.user?.email)
                setNameG(`${name}`)
                history.push('/Main')
            })
            .catch((error) => {
                // console.log(`${email}`)
                {
                    `${email}`.length === 0 &&
                        window.alert("メールアドレスを入力してください (｀・ω・´)")
                };
                {
                    `${email}`.length !== 0 &&
                        //    if (
                        window.confirm("パスワードをお忘れですか。\n" + `${email}` + "へパスワード再設定のメールをお送りします。")
                    //    ) {
                    // console.log()  
                    var auth = firebase.auth();
                    var emailAddress = `${email}`;
                    auth.sendPasswordResetEmail(emailAddress).then(function () {
                        // Email sent.
                    }).catch(function (error) {
                        // An error happened.
                    })
                    // } else {
                    // }
                };
            });
    }
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
                console.log(avatarG)
                setAvatar(`${avatarG}`)
                history.push('/Main');
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    const handleCreate = () => {
        setNameG("new!")
        console.log(nameG)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('success login')
                var user = userCredential.user;
                const name = (user?.email)
                setNameG(`${nameG}`)
                history.push('/Main')
                var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
                    email, window.location.href);
                firebase.auth().currentUser?.reauthenticateWithCredential(credential)
                    .then((usercred) => {
                    })
                    .catch((error) => {
                    });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                setError(errorMessage)
            });
    }
    // const currentPassword = () => {
    //     var auth = firebase.auth();
    //     var emailAddress = "xcnsn724@yahoo.co.jp";

    //     auth.sendPasswordResetEmail(emailAddress).then(function () {
    //         // Email sent.
    //     }).catch(function (error) {
    //         // An error happened.
    //     });
    // }
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setName('')
            setNameG('')
            setAvatar('')
            setEmail('')
            setPassword('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;

        });
    }

    return (
        <div>
            {nameG.length === 0 && (
                <Toolbar>
                    {/* <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="email"
                        name="name"
                        defaultValue=""
                        autoComplete="email"
                        // autoFocus
                        onChange={(e) => setName(e.target.value)}
                    /> */}
                    {/* <SendIcon onClick={currentPassword} /> */}
                    <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                    {/* {error} */}
                    <Button variant="outlined" fullWidth onClick={handleClick}>Login</Button><br />
                    {/* {error} */}
                    <Button variant="outlined" fullWidth onClick={handleCreate}>新規登録</Button><br />
                    {/* <Link to='/createUser' >アカウント作成</Link> */}
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={googleClick}
                        color="primary"
                    >
                        google in
          </Button>
                </Toolbar>
            )}
            {nameG === "new!" && (
                <div>
                    <h2>CreateUser</h2>
                    <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                    <Button variant="outlined" onClick={handleCreate}>Create</Button>
                    <Button variant="contained" onClick={signOut}>
                        戻る
               </Button>
                    {error.length !== 0 && (
                        <h6>{`${error}`}</h6>
                    )}
                </div>
            )}
        </div>
    );
};

export default Login;
