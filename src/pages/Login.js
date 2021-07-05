import React, { useEffect, useState } from 'react';
import styles from './Counter.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import Typography from '@material-ui/core/Typography';
import logo from '../img/0730.jpg';
import lineLogo from '../img/square-default.png';
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
        // if (liff.isLoggedIn()) {
        //     liff.getProfile()
        //         .then(profile => {
        //             setNName(profile.displayName)
        //             setName(profile.userId)
        //             setAvatar(profile.pictureUrl)
        //         })
        // }
        // history.push(`/Main`)
    }



    const sendMessage = function (e) {
        liff.login();
        liff.shareTargetPicker([{
            'type': 'text',
            'text': 'Hello, World!'
        }])
    }

    // const sendMessage = function (e) {
    //     if (liff.isApiAvailable('shareTargetPicker')) {
    //         liff.shareTargetPicker([
    //             {
    //                 'type': 'text',
    //                 'text': 'Hello, World!'
    //             }
    //         ])
    //             .then(function (res) {
    //                 if (res) {
    //                     // succeeded in sending a message through TargetPicker
    //                     console.log(`[${res.status}] Message sent!`)
    //                 } else {
    //                     const [majorVer, minorVer] = (liff.getLineVersion() || "").split('.');
    //                     if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
    //                         // LINE 10.3.0 - 10.10.0
    //                         // Old LINE will access here regardless of user's action
    //                         console.log('TargetPicker was opened at least. Whether succeeded to send message is unclear')
    //                     } else {
    //                         // LINE 10.11.0 -
    //                         // sending message canceled
    //                         console.log('TargetPicker was closed!')
    //                     }
    //                 }
    //             }).catch(function (error) {
    //                 // something went wrong before sending a message
    //                 console.log('something wrong happen')
    //             })
    //     }
    // }

    // const sendMessage = function (e) {
    //     // Check if shareTargetPicker is available
    //     if (liff.isApiAvailable('shareTargetPicker')) {
    //         liff.shareTargetPicker([
    //             {
    //                 type: "text",
    //                 text: "Hello, World!"
    //             }
    //         ])
    //             .then(
    //                 console.log("ShareTargetPicker was launched")
    //             ).catch(function (res) {
    //                 console.log("Failed to launch ShareTargetPicker")
    //             })
    //     }
    //     // Check if multiple liff transtion feature is available
    //     if (liff.isApiAvailable('multipleLiffTransition')) {
    //         window.location.href = "https://liff.line.me/1656149559-xXM4l4Gp"
    //     }
    // }

    // const sendMessage = function (e) {
    //     if (liff.isApiAvailable('shareTargetPicker')) {
    //         liff.shareTargetPicker([{
    //             'type': 'text',
    //             'text': 'Hello, World!'
    //         }]).then(
    //             //shareTargetPickerの取得に成功　　　　　　　
    //             document.getElementById('shareTargetPickerMessage').textContent = "Share target picker was launched."
    //         ).catch(function (res) {
    //             //「シェアターゲットピッカー」が有効になっているが取得に失敗した場合 
    //             document.getElementById('shareTargetPickerMessage').textContent = "Failed to launch share target picker.";
    //         });
    //     } else {
    //         //「シェアターゲットピッカー」が無効になっている場合
    //         document.getElementById('shareTargetPickerMessage').innerHTML = "<div>Share target picker unavailable.<div><div>This is possibly because you haven't enabled the share target picker on <a href='https://developers.line.biz/console/'>LINE Developers Console</a>.</div>";
    //     }
    // }

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
    //     document.getElementById('sendMessage').addEventListener('click', function () {
    //         // if (!liff.isInClient()) {
    //         //     sendAlertIfNotInClient();
    //         // } else {
    //         liff.sendMessages([{
    //             'type': 'text',
    //             'text': "Hello, World!"
    //         }]).then(function () {
    //             window.alert('Message sent');
    //         }).catch(function (error) {
    //             window.alert('Error sending message: ' + error);
    //         });
    //     })
    // };

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
                    </Typography>
                </div>
                <div class="line-it-button" data-lang="ja" data-type="share-b" data-ver="3" data-url="https://twitter-app-eriko.web.app" data-color="default" data-size="small" data-count="false" >sendMessage
                <div>
                        <a href="https://social-plugins.line.me/lineit/share?url=https://twitter-app-eriko.web.app" ><img src={lineLogo} size="small" alt="LINEメッセージを送る" /></a>
                    </div>
                    <button onClick={sendMessage} color="secondary">sendMessage</button>
                </div>
            </div>
        </div >
    );
};

export default Login;
