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
            color: 'green',
        },
    }));
    const classes = useStyles();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [nameG, setNameG] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()

    const handleClick = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('success login')
                const name = (userCredential.user?.email)
                setNameG(`${name}`)
                history.push('/Main')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage)
                {
                    `${email}`.length === 0 &&
                        window.alert("メールアドレスを入力してください (｀・ω・´)")
                };
                {
                    `${email}`.length !== 0 &&
                        window.confirm("パスワードをお忘れですか。\n" + `${email}` + "へパスワード再設定のメールをお送りします。")
                    var auth = firebase.auth();
                    var emailAddress = `${email}`;
                    auth.sendPasswordResetEmail(emailAddress).then(function () {
                    }).catch(function (error) {
                    })
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
                setAvatar(`${avatarG}`)
                history.push('/Main');
                console.log(avatar)
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
        setError("メールアドレスを入力してください");
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('success login')
                var user = userCredential.user;
                const name = (user?.email)
                setError('');
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
                            <TextField id="email" fullWidth label="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Typography>
                        <Typography>
                            <TextField id="password" fullWidth label="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Typography>
                        <Typography>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={email === ''}
                                onClick={handleClick}
                            >
                                Login</Button>
                        </Typography>
                        <Typography>
                            <Button variant="outlined" fullWidth onClick={handleCreate} className={classes.submit}>新規登録</Button>
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
                            <Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={password === ''}
                                    onClick={handleClick}
                                >
                                    登録</Button>
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
