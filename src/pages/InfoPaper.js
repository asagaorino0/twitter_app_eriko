import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from "@material-ui/core";
import liff from '@line/liff';
import { useHistory } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimplePaper({ messages }) {
    const db = firebase.firestore();
    const history = useHistory()
    const myLiffId = "1656149559-xXM4l4Gp"
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

    // // const tuuchiClick = function () {
    // //     liff.login();
    // // };

    // // window.onload = function (e) {
    // //     liff
    // //         .init({ liffId: myLiffId })
    // //         .then(() => {
    // //             // 初期化完了
    // //             initializeApp();
    // //         })
    // // };
    // function initializeApp() {
    //     // ログインチェック
    //     if (liff.isLoggedIn()) {
    //         // ログイン済
    //         tuuchiOnload()
    //     } else {
    //         // 未ログイン
    //         let result = window.confirm("LINE Loginしますか？");
    //         if (result) {
    //             // liff.login();
    //             window.location.href = loginUrl;
    //         }
    //     }
    // }
    // const tuuchiOnload = function (e) {
    //     // if (liff.isLoggedIn()) {
    //     //     liff.getProfile()
    //     //         .then(profile => {
    //     //             setNName(profile.displayName)
    //     //             setName(profile.userId)
    //     //             setAvatar(profile.pictureUrl)
    //     //             console.log("{infolist}", `${nName}`, `${avatar}`, `${name}`);
    //     //             db.collection('users').doc(`${profile.userId}`).set({
    //     //                 name: `${profile.userId}`,
    //     //                 nName: `${profile.displayName}`,
    //     //                 avatar: `${profile.pictureUrl}`,
    //     //                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     //             }, { merge: true }//←上書きされないおまじない
    //     //             )
    //     handleClick()
    //     //         })
    //     // }
    // }
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
        setMessagesId(messages.id)
        console.log(`/EventTuuchi/${messagesId}`)
        history.push(`/EventTuuchi/${messages.id}`)
        // })
    };
    const handleClose = () => {
        setAnchorMl(null);
    };

    return (

        < Paper className={classes.paper} onClick={handleClick} >
            <Grid container wrap="nowrap" spacing={1} >
                <Grid item style={{ cursor: 'pointer' }}>
                    <img src={messages.avatar} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                </Grid>
                <Grid item xs >
                    <Typography onClick={handleClick} style={{ cursor: 'pointer' }} variant="h6" component="h6" >
                        {messages.event}
                    </Typography>
                    {`${messages.nichi}`.length !== 0 &&
                        <Typography style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            開催日：{messages.nichi}
                        </Typography>
                    }
                    <Typography style={{ cursor: 'pointer' }} variant="caption" color="textSecondary">
                        {messages.nName}:
                                        </Typography>
                    <Typography style={{ cursor: 'pointer' }} variant="caption" color="textSecondary">
                        {messages.time}更新
                                    </Typography>
                </Grid>
            </Grid>
            {/* <div>
                <Menu
                    id="simple-menu"
                    anchorMl={anchorMl}
                    fullWidth={true}
                    keepMounted
                    open={Boolean(anchorMl)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={handleClose}
                    >
                        <img src={`${messages.avatar}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                    >{`${messages.id}`}
                    </MenuItem>
                </Menu>
            </div> */}
        </Paper>
    );

}
