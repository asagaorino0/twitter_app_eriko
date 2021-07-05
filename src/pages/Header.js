import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import firebase from '../config/firebase'
import { Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button, Link } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { storage } from "../config/firebase";
import FolderIcon from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import TelegramIcon from '@material-ui/icons/Telegram';
import lineLogo from '../img/square-default.png';
import liff from '@line/liff';

const Header = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
    const db = firebase.firestore();
    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState('');
    const [avatar, setAvatar] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const [nameG, setNameG] = useState('');
    const [message, setMessage] = useState('');
    const [event, setEvent] = useState('');
    const [nichi, setNichi] = useState('');
    const [zi, setZi] = useState('');
    const [basyo, setBasyo] = useState('');
    const [url, setUrl] = useState('');
    const [insta, setInsta] = useState('');
    const ref = useRef < HTMLDivElement > (null);
    const history = useHistory()
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const now = Y + '年' + M + '月' + D + '日 ' + h + ':' + m

    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                // console.log("{header}", `${nName}`, `${avatar}`, `${name}`);
            })
    }, []
    );
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setNameG('')
            setAvatar('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;
        });
    }
    const myPage = () => {
        history.push('/MyPage')
    }
    const myStar = () => {
        history.push('/MyStar')
    }
    const myLoad = () => {
        history.push('/MyLoad')
    }
    const handleCreate = async () => {
        await
            db.collection("messages").add({
                name: `${name}`,
                avatar: `${avatar}`,
                nName: `${nName}`,
                event: `${event}`,
                nichi: `${nichi}`,
                zi: `${zi}`,
                basyo: `${basyo}`,
                message,
                url: `${url}`,
                src: `${src}`,
                time: now,
                star: 0,
                myPage: false,
                like: false,
                sita: false,
                load: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docref) => {
                    console.log("Document successfully written!:", docref.id);
                    setMessage("");
                    setSrc("");
                    setUrl("");
                    setMyFiles([]);
                    setClickable(false);
                    db.collection("messages").doc(docref.id).set({
                        id: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
                    db.collection("users").doc(`${name}`).collection('loadsita').doc(docref.id).set({
                        id: docref.id,
                        name: `${name}`,
                        avatar: `${avatar}`,
                        nName: `${nName}`,
                        event: `${event}`,
                        nichi: `${nichi}`,
                        zi: `${zi}`,
                        basyo: `${basyo}`,
                        message,
                        url: `${url}`,
                        src: `${src}`,
                        time: now,
                        star: 0,
                        myPage: true,
                        like: false,
                        sita: false,
                        load: true,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    }, { merge: true }//←上書きされないおまじない
                    )
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
    }
    const sitarId = async () => {
        await
            db.collection("users").doc(`${name}`).collection("sitagaki").add({
                name: `${name}`,
                avatar: `${avatar}`,
                nName: `${nName}`,
                event: `${event}`,
                nichi: `${nichi}`,
                zi: `${zi}`,
                basyo: `${basyo}`,
                message,
                url: `${url}`,
                src: `${src}`,
                time: now,
                star: 0,
                myPage: true,
                like: false,
                sita: true,
                load: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docsita) => {
                    console.log("Document successfully written!:", docsita.id);
                    setMessage("");
                    setSrc("");
                    setNichi("");
                    setZi("");
                    setBasyo("");
                    setUrl("");
                    setMyFiles([]);
                    setClickable(false);
                    db.collection("users").doc(`${name}`).collection("sitagaki").doc(docsita.id).set({
                        id: docsita.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
                })
    }

    const [myFiles, setMyFiles] = useState([]);
    const [clickable, setClickable] = useState(false);
    const [src, setSrc] = useState("");
    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles[0]) return;
        try {
            setMyFiles([...acceptedFiles]);
            setClickable(true);
            handlePreview(acceptedFiles);
        } catch (error) {
            alert(error);
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });
    const handleUpload = async (accepterdImg) => {
        try {
            // アップロード処理
            const uploadTask = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]);
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
        }
        catch (error) {
        }
    };
    const handlePreview = (files) => {
        if (files === null) {
            return;
        }
        const file = files[0];
        if (file === null) {
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSrc(reader.result);
        };
    };

    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
        textfield: {
            backgroundColor: '#fff',
        },
        formControl: {
            margin: 'spacing(1)',
            minWidth: '120px',
        },
        selectEmpty: {
            marginTop: 'spacing(2)',
        },
        heading: {
            fontSize: 'typography.pxToRem(11)',
            fontWeight: 'typography.fontWeightRegular',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '5px 5px 5px 20px',
        },
    });
    const classes = useStyles();

    window.onload = function (e) {
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

    const sendMessage1 = function (e) {
        const line = require('@line/bot-sdk');
        const client = new line.Client({
            channelAccessToken: 'RyGBqiciaprN0e4/UWor9L4kgra7M560lqinnyXyu6LWwnSNI5O7ZA2Ug4MHnpoViLyk0pwZfJ5bCdOVWNUmlM7PKtJPbIq1cevZtPmVuPsv0nKutgL8prDWKGc6NDnQgYosP8BwHh3Ss6ZRG+2tfwdB04t89/1O/w1cDnyilFU='
        });
        liff.shareTargetPicker([
            client.multicast(['U585f9b381deecf0fd66404a2325e517e', '', '',
            ]),
            {
                'type': 'text',
                'text': 'Hello, World!'
            }])
    }


    const sendMessage2 = function (e) {
        const line = require('@line/bot-sdk');
        const client = new line.Client({
            channelAccessToken: 'RyGBqiciaprN0e4/UWor9L4kgra7M560lqinnyXyu6LWwnSNI5O7ZA2Ug4MHnpoViLyk0pwZfJ5bCdOVWNUmlM7PKtJPbIq1cevZtPmVuPsv0nKutgL8prDWKGc6NDnQgYosP8BwHh3Ss6ZRG+2tfwdB04t89/1O/w1cDnyilFU='
        });
        if (liff.isApiAvailable('shareTargetPicker')) {
            // liff.shareTargetPicker([
            client.multicast(['U585f9b381deecf0fd66404a2325e517e', '', '',
                // ])
                {
                    'type': 'text',
                    'text': 'Hello, World!'
                }

            ])
                .then(function (res) {
                    if (res) {
                        // succeeded in sending a message through TargetPicker
                        console.log(`[${res.status}] Message sent!`)
                    } else {
                        const [majorVer, minorVer] = (liff.getLineVersion() || "").split('.');
                        if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {
                            // LINE 10.3.0 - 10.10.0
                            // Old LINE will access here regardless of user's action
                            console.log('TargetPicker was opened at least. Whether succeeded to send message is unclear')
                        } else {
                            // LINE 10.11.0 -
                            // sending message canceled
                            console.log('TargetPicker was closed!')
                        }
                    }
                }).catch(function (error) {
                    // something went wrong before sending a message
                    console.log('something wrong happen')
                })
        }
    }

    const sendMessage3 = function (e) {
        // Check if shareTargetPicker is available
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([
                {
                    "type": "text",
                    "text": "\uDBC0\uDC84 LINE original emoji"
                }
            ])
                .then(
                    console.log("ShareTargetPicker was launched")
                ).catch(function (res) {
                    console.log("Failed to launch ShareTargetPicker")
                })
        }
        // Check if multiple liff transtion feature is available
        if (liff.isApiAvailable('multipleLiffTransition')) {
            window.location.href = "https://liff.line.me/1656149559-xXM4l4Gp"
        }
    }
    //使えないやつ
    // const line = require('@line/bot-sdk');
    // const client = new line.Client({
    //     channelAccessToken: 'RyGBqiciaprN0e4/UWor9L4kgra7M560lqinnyXyu6LWwnSNI5O7ZA2Ug4MHnpoViLyk0pwZfJ5bCdOVWNUmlM7PKtJPbIq1cevZtPmVuPsv0nKutgL8prDWKGc6NDnQgYosP8BwHh3Ss6ZRG+2tfwdB04t89/1O/w1cDnyilFU='
    // });
    // const message1 = {
    //     type: 'text',
    //     text: 'Hello,'
    // };
    // const message2 = {
    //     type: 'text',
    //     text: 'World!'
    // };
    // const sendMessage4 = function (req, res) {
    //     // res.statusCode = 200;
    //     res.setHeader('Access-Control-Allow-Origin', 'https://twitter-app-eriko.web.app')
    //     res.end();
    //     client.multicast(['U585f9b381deecf0fd66404a2325e517e', '', ''],
    //         [message1, message2]
    //     )
    // }
    //使えないやつ
    // const sendMessage4 = function (e) {
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
    //使えないやつ
    // const text = "I sent test message!"
    // function sendMessage5() {
    //     liff.sendMessages(
    //         [{ type: "text", text }]
    //     ).then(function () {
    //         window.alert('Message sent');
    //     }).catch(function (error) {
    //         window.alert('Error sending message: ' + error);
    //     });
    // }


    return (
        <div className={classes.root}>
            <Toolbar>
                {/* <div class="line-it-button" data-lang="ja" data-type="like" data-url="https://twitter-app-eriko.web.app" data-lineid="@435dcwgo" style="display: none;"></div> */}
                {/* <script src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js" async="async" defer="defer"></script> */}
                <img
                    src={`${avatar}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                />
                <h5>{`${nName}さん！ようこそ！！`}</h5>
                <br />
                <Button variant="outlined" color="primary" onClick={myPage}>
                    MyPage
            </Button>
                <Button variant="contained" onClick={signOut}>
                    Logout
            </Button>
                <div>
                    <Link
                        href="https://social-plugins.line.me/lineit/share?url=https://twitter-app-eriko.web.app"
                        underline="none"
                        target="_blank"
                    ><img src={lineLogo} size="small" alt="LINEメッセージを送る" />
                    </Link>
                </div>
                {/* <div class="line-it-button" data-lang="ja" data-type="share-b" data-ver="3" data-url="https://twitter-app-eriko.web.app" data-color="default" data-size="small" data-count="false" style="display: none;"></div> */}
                {/* <script src="https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js" async="async" defer="defer"></script> */}
                <button onClick={sendMessage1} color="secondary">sendMessage1</button>
                <button onClick={sendMessage2} color="secondary">sendMessage2</button>
                <button onClick={sendMessage3} color="secondary">sendMessage3</button>
            </Toolbar>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="button" >イベントの募集</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

                        <TextField
                            label="イベント名"
                            fullWidth={true}
                            onChange={(e) => setEvent(e.target.value)}
                            value={event}

                        />
                        <TextField
                            label="年月日"
                            type="date"
                            defaultValue=""
                            fullWidth={true}
                            onChange={(e) => setNichi(e.target.value)}
                            value={nichi}
                        />
                        <TextField
                            label="時間"
                            type="time"
                            defaultValue=""
                            fullWidth={true}
                            onChange={(e) => setZi(e.target.value)}
                            value={zi}
                        />
                        <TextField
                            label="場所"
                            // type="datetime-local"
                            defaultValue=""
                            fullWidth={true}
                            onChange={(e) => setBasyo(e.target.value)}
                            value={basyo}
                        />
                        <TextField
                            label="メッセージ"
                            fullWidth={true}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <TextField required id="standard-required"
                            label="関連url"
                            defaultValue={messages.url}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {/* <TextField required id="standard-required"
                            label="関連url"
                            defaultValue={messages.insta}
                            value={insta}
                            onChange={(e) => setIUrl(e.target.value)}
                        /> */}
                    </Typography>
                </AccordionDetails>
                <Card>
                    <CardContent>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {myFiles.length === 0 ? (
                                <FolderIcon />
                            ) : (
                                <div style={{ width: '180px', height: '180px' }}>
                                    {myFiles.map((file) => (
                                        <React.Fragment key={file.name}>
                                            {src && <img src={src} />}
                                        </React.Fragment>
                                    )
                                    )}
                                </div>
                            )}
                        </div>
                        {event.length !== 0 && (
                            <Toolbar >
                                {/* <SendIcon onClick={handleCreate} /> */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    endIcon={<SaveIcon />}
                                    onClick={sitarId}
                                >
                                    下書き保存
      </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    size="small"
                                    endIcon={<TelegramIcon />}
                                    onClick={handleCreate}
                                >
                                    投稿する
      </Button>
                            </Toolbar>
                        )}
                    </CardContent>
                </Card>
            </Accordion>
        </div>
    )
}

export default Header