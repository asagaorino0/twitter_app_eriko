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
    const [message, setMessage] = useState('');
    const [event, setEvent] = useState('');
    const [nichi, setNichi] = useState('');
    // const [adate, setAdate] = useState('');
    const [limit, setLimit] = useState('');
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
    const now = M + '月' + D + '日 ' + h + ':' + m
    const news = (Y + M + D) * 1
    var vYear = parseInt(`${nichi}`.substr(0, 4), 10);
    var vMonth = parseInt(`${nichi}`.substr(5, 2), 10);
    var vDay = parseInt(`${nichi}`.substr(8, 2), 10);
    const adate = (vYear * 10000 + vMonth * 100 + vDay);

    // // 現在ログインしているユーザーを取得する
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
    // useEffect(() => {
    //     setNName("おりのえりこ")
    //     setName("Ue990787da85bbd95eae9595867add9ba")
    //     setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
    //     // console.log(name, nName)
    // }, []
    // );

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setNName('')
            setAvatar('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;
        });
    }
    const myPage = () => {
        history.push('/MyPage')
    }
    const handleCreate = async () => {
        if (`${adate}`.toString() === "NaN") {
            setLimit(99999999)
        } else {
            setLimit(`${adate}`)
        }
        await
            db.collection("messages").add({
                name: `${name}`,
                avatar: `${avatar}`,
                nName: `${nName}`,
                event: `${event}`,
                nichi: `${nichi}`,
                limit: `${limit}`,
                zi: `${zi}`,
                basyo: `${basyo}`,
                message,
                url: `${url}`,
                src: `${src}`,
                time: now,
                news: `${news}`,
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
                    if (`${nichi}` === "") {
                        db.collection("messages").doc(docref.id).set({
                            id: docref.id,
                            limit: "99999999",
                        }, { merge: true }//←上書きされないおまじない
                        )
                    } else {
                        db.collection("messages").doc(docref.id).set({
                            id: docref.id,
                            limit: `${adate}`,
                        }, { merge: true }//←上書きされないおまじない
                        )
                    }
                    console.log("adate:", `${adate}`.toString());
                    console.log("limit:", `${limit}`);
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
                        news: `${news}`,
                        limit: `${limit}`,
                        star: 0,
                        myPage: true,
                        like: false,
                        sita: false,
                        load: true,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    }, { merge: true }//←上書きされないおまじない
                    )
                    window.alert("投稿しました。ありがとうございます😘");
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
                news: `${news}`,
                limit: `${limit}`,
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

    useEffect(() => {
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
    }, []
    );

    const sendMessage1 = function (e) {
        liff.shareTargetPicker([{
            'type': 'text',
            'text': 'Hello, World!'
        }])
    }

    const sendMessage2 = function (e) {
        if (liff.isApiAvailable('shareTargetPicker')) {
            liff.shareTargetPicker([
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
    const sendMessage4 = function (e) {
        liff.sendMessages([
            {
                type: 'text',
                text: 'Hello, World!'
            }
        ])
            .then(() => {
                console.log('message sent');
            })
            .catch((err) => {
                console.log('error', err);
            });
    }

    return (
        <div className={classes.root}>
            <Toolbar>
                <img
                    src={`${avatar}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                />
                <h5 style={{ textAlign: 'justify' }}>{`${nName}さん！ようこそ！！`}</h5>
                <br />
                <Button variant="outlined" color="primary" onClick={myPage}>
                    MyPage
            </Button>
                <Button variant="contained" onClick={signOut}>
                    Logout
            </Button>
                <div>
                    {/* <Link
                        href="https://social-plugins.line.me/lineit/share?url=https://twitter-app-eriko.web.app"
                        underline="none"
                        target="_blank"
                    ><img src={lineLogo} size="small" alt="LINEメッセージを送る" />
                    </Link> */}
                </div>
                {/* <button onClick={sendMessage1} color="secondary">sendMessage1</button> */}
                {/* <button onClick={sendMessage2} color="secondary">sendMessage2</button> */}
                {/* <button onClick={sendMessage3} color="secondary">sendMessage3</button> */}
                {/* <button onClick={sendMessage4} color="secondary">sendMessage4</button> */}
            </Toolbar>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="button" >イベントの募集【新規投稿できます】</Typography>
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
                            label="　　　　　　月日"
                            type="date"
                            defaultValue=""
                            fullWidth={true}
                            onChange={(e) => setNichi(e.target.value)}
                            value={nichi}
                        />
                        <TextField
                            label="　　　　　　時間"
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
                    </Typography>
                </AccordionDetails>
                <Card>
                    <CardContent>
                        ファイルの添付は工事中です。
                        {/* <div {...getRootProps()}>
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
                        </div> */}
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