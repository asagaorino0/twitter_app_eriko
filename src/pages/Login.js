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


    const lineClick = function (e) {
        liff
            .init({ liffId: myLiffId })
            .then(() => {
                // .ready.then(() => {
                // 初期化完了
                liff.login();
            })
    };
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
    window.onload = function (e) {
        if (liff.isLoggedIn()) {
            //         //ログイン済

            // useEffect(() => {
            liff.getProfile()
                .then(profile => {
                    setNName(profile.displayName)
                    setName(profile.userId)
                    setAvatar(profile.pictureUrl)
                    // console.log("{header}", `${nName}`, `${avatar}`, `${name}`);
                })
        }
    }
    // }, []
    const onload = function (e) {
        // );
        history.push(`/Main`)
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
                <div>
                    <Typography>

                    </Typography>
                    <Typography>
                        {/* {name.length !== 0 && ( */}
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={onload}
                            // onClick={initializeApp}
                            className={classes.green}
                        >
                            Hello! {nName}
                        </Button>
                        {/* )} */}
                    </Typography>

                    <Typography>
                        {/* {name.length === 0 && ( */}
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={lineClick}
                            className={classes.green}
                        >
                            lineでLogin
                            </Button>
                        {/* )} */}
                    </Typography>
                </div>
            </div>
        </div >
    );
};

export default Login;
