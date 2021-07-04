import React, { useEffect, useState } from 'react';
import styles from './Counter.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import Typography from '@material-ui/core/Typography';
import logo from '../img/0730.jpg';
import liff from '@line/liff';

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
    const history = useHistory()
    const myLiffId = "1656149559-xXM4l4Gp"

    window.onload = function (e) {
        liff
            .init({ liffId: myLiffId })
            .then(() => {
                // 初期化完了
                initializeApp();
            })
    };

    function initializeApp() {
        // ログインチェック
        if (liff.isLoggedIn()) {
            //ログイン済
            onload()
        } else {
            //     // 未ログイン
            let result = window.confirm("LINE Loginしますか？");
            if (result) {
                liff.login();
            }
        }
    }
    const lineClick = function (e) {
        liff.login();
    }

    const onload = function (e) {
        if (liff.isLoggedIn()) {
            liff.getProfile()
                .then(profile => {
                    setNName(profile.displayName)
                    setName(profile.userId)
                    setAvatar(profile.pictureUrl)
                    // console.log("{header}", `${nName}`, `${avatar}`, `${name}`);
                })
        }
        history.push(`/Main`)
    }
    // // const handleWindow = () => {
    // // if (liff.isApiAvailable('Uccd83a6500bba57ace57024cb31d5a1a')) {
    // // if (liff.isApiAvailable('Ue990787da85bbd95eae9595867add9ba')) {
    // const text = "I sent test message!"
    // function sendMessage() {
    //     liff.sendMessages(
    //         [{ type: "text", text }]
    //     ).then(function () {
    //         window.alert('Message sent');
    //     }).catch(function (error) {
    //         window.alert('Error sending message: ' + error);
    //     });
    // }
    // // }

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
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={lineClick}
                            className={classes.green}
                        >
                            lineでLogin
                            </Button>

                        {/* <button onClick={sendMessage} color="secondary">open</button> */}
                    </Typography>
                </div>
            </div>
        </div >
    );
};

export default Login;
