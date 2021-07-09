import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import InfoPaper from './InfoPaper'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from "@material-ui/core";
import liff from '@line/liff';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const InfoList = () => {
    const db = firebase.firestore();
    const history = useHistory()
    const myLiffId = "1656149559-xXM4l4Gp"
    const [messages, setMessages] = useState('');
    const [messagesId, setMessagesId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const loginUrl = "https://access.line.me/oauth2/v2.1/authorize?app_id=1656149559-xXM4l4Gp&client_id=1656149559&scope=chat_message.write+openid+profile&state=MTSFhIGGxsff&bot_prompt=aggressive&response_type=code&code_challenge_method=S256&code_challenge=Hx-YFyPAvO9ZQIg5pQpaGQuMChsOE11Raf_3DHDGFgY&liff_sdk_version=2.11.1&type=L&redirect_uri=https%3A%2F%2Ftwitter-app-eriko.web.app%2F"
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '年' + M + '月' + D + '日 ' + h + ':' + m
    const today = (Y + M + D) * 1

    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setMessages(messages);
                // console.log(messages)
            })
    }, []
    );
    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '20px',
        },
        paper: {
            maxWidth: 400,
            alignItems: 'center',
            margin: '5px 0px 5px 0px ',
            padding: '12px',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        },
        pos: {
            marginBottom: 0,
        },
    });
    const classes = useStyles();
    const [anchorMl, setAnchorMl] = React.useState(null);

    // const tuuchiClick = function () {
    //     liff.login();
    // };

    // window.onload = function (e) {
    //     liff
    //         .init({ liffId: myLiffId })
    //         .then(() => {
    //             // 初期化完了
    //             initializeApp();
    //         })
    // };
    function initializeApp() {
        // ログインチェック
        if (liff.isLoggedIn()) {
            // ログイン済
            tuuchiOnload()
        } else {
            // 未ログイン
            let result = window.confirm("LINE Loginしますか？");
            if (result) {
                // liff.login();
                window.location.href = loginUrl;
            }
        }
    }
    const tuuchiOnload = function (e) {
        // if (liff.isLoggedIn()) {
        //     liff.getProfile()
        //         .then(profile => {
        //             setNName(profile.displayName)
        //             setName(profile.userId)
        //             setAvatar(profile.pictureUrl)
        //             console.log("{infolist}", `${nName}`, `${avatar}`, `${name}`);
        //             db.collection('users').doc(`${profile.userId}`).set({
        //                 name: `${profile.userId}`,
        //                 nName: `${profile.displayName}`,
        //                 avatar: `${profile.pictureUrl}`,
        //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //             }, { merge: true }//←上書きされないおまじない
        //             )
        handleClick()
        //         })
        // }
    }
    const handleClick = (event) => {
        setAnchorMl(event.currentTarget);
        console.log(event.currentTarget)
        // firebase
        //     .firestore()
        //     .collection("messages")
        //     .orderBy("timestamp", "desc")
        //     .onSnapshot((snapshot) => {
        //         const messages = snapshot.docs.map((doc) => {
        //             return doc.id &&
        //                 doc.data()
        //         });
        //         setMessages(messages);
        console.log(messages.id)
        // history.push(`/EventTuuchi/${messagesId}`)
        // })
    };
    // const handleClose = () => {
    //     setAnchorMl(null);
    // };

    return (
        <div className={classes.root}>
            it's new!
            {messages.length !== 0 &&
                messages
                    // .filter((messages) => messages.limit > today - 7)
                    .filter((messages) => messages.news > today - 3)
                    .map((messages, index) => {
                        return (
                            <InfoPaper messages={messages} key={`${messages.id} `} />

                        )
                    })
            }
        </div>
    );
};
export default InfoList;