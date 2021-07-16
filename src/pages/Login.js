import React, { useState } from 'react';
import firebase from '../config/firebase'
import styles from './Counter.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../img/0730.jpg';
import lineLogo from '../img/square-default.png';
import liff from '@line/liff';
import { Link } from "@material-ui/core";
import InfoList from './InfoList';

// import { get } from '@line/liff/dist/lib/store/';

const Login = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        root: {
            gridRow: 2,
            margin: '26px',
            maxWidth: 400,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        green: {
            color: '#ffffff',
            backgroundColor: '#06c775',
        },
    }));
    const classes = useStyles();
    const db = firebase.firestore();
    const [avatar, setAvatar] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const history = useHistory()
    const myLiffId = "1656149559-xXM4l4Gp"
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?app_id=1656149559-xXM4l4Gp&client_id=1656149559&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=https%3A%2F%2Ftwitter-app-eriko.web.app%2F"

    // window.onload = function (e) {
    //     liff
    //         .init({ liffId: myLiffId })
    //         .then(() => {
    //             // 初期化完了
    //             initializeApp();
    //         })
    // };
    // function initializeApp() {
    //     // ログインチェック
    //     if (liff.isLoggedIn()) {
    //         //ログイン済
    //         // onload()
    //         onload()
    //     } else {
    //         // 未ログイン
    //         let result = window.confirm("LINE Loginしますか？新着情報を確認する場合はキャンセルしてください。");
    //         if (result) {
    //             liff.login();
    //             // window.location.href = loginUrl;
    //         }
    //     }
    // }
    // const lineClick = function () {
    //     liff.login();
    //     // window.location.href = loginUrl;
    // };
    // const onload = function (e) {
    //     if (liff.isLoggedIn()) {
    //         liff.getProfile()
    //             .then(profile => {
    //                 setNName(profile.displayName)
    //                 setName(profile.userId)
    //                 setAvatar(profile.pictureUrl)
    //                 console.log("{login}", `${nName}`, `${avatar}`, `${name}`);
    //                 // firebase.firestore().settings({
    //                 //     ignoreUndefinedProperties: true,
    //                 // })
    //                 db.collection('users').doc(`${profile.userId}`).set({
    //                     name: `${profile.userId}`,
    //                     nName: `${profile.displayName}`,
    //                     avatar: `${profile.pictureUrl}`,
    //                     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //                 }, { merge: true }//←上書きされないおまじない
    //                 )
    //                 history.push(`/Main`)
    //             })
    //     }
    // }

    const googleClick = () => {
        setNName("おりのえりこ")
        setName("Ue990787da85bbd95eae9595867add9ba")
        setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
        console.log("name", `${name}`)
        history.push(`/Main`)
    }

    return (
        // <div className={classes.root}>
        <div className={classes.paper}>
            <img src={logo} style={{ borderRadius: '50%', width: '60px', height: '60px' }} alt="logo" />
            <div>
                <span className={styles.value} style={{ maxWidth: '350' }}>konoyubi</span>
                <Typography component="h6" variant="h6">
                    介護✕美容のつながるアプリ
                </Typography>
                <div>
                    <Typography>
                        {/* <Button
                            variant="contained"
                            fullWidth
                            onClick={lineClick}
                            className={classes.green}
                        >
                            lineでLogin
                            </Button> */}
                    </Typography>
                </div>
            </div>
            <div>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={googleClick}
                    color="primary"
                >
                    googleでLogin
                 </Button>
                {/* <MyPage /> */}
                <InfoList />
            </div>
        </div>
    );
};

export default Login;
