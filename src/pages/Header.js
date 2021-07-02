import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import firebase from '../config/firebase'
import { Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";
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
import liff from '@line/liff';
import { Store } from '../store/index'

const Header = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
    const { globalState, setGlobalState } = useContext(Store)
    const db = firebase.firestore();
    const [user, setUser] = useState([]);
    const [messages, setMessages] = useState('');
    const [avatar, setAvatar] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const [nameG, setNameG] = useState('');
    const [message, setMessage] = useState('');
    const [event, setEvent] = useState('');
    const [nichizi, setNichizi] = useState('');
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
                nichizi: `${nichizi}`,
                message,
                insta: `${insta}`,
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
                    setInsta("");
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
                        nichizi: `${nichizi}`,
                        message,
                        insta: `${insta}`,
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
                nichizi: `${nichizi}`,
                message,
                insta: `${insta}`,
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
                    setInsta("");
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

    return (
        <div className={classes.root}>
            <Toolbar>
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
                <Button variant="outlined" color="primary" onClick={myLoad}>
                    MyLoad
            </Button>
                <Button variant="contained" onClick={signOut}>
                    Logout
            </Button>
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
                            label="日時"
                            // type="datetime-local"
                            defaultValue=""
                            fullWidth={true}
                            onChange={(e) => setNichizi(e.target.value)}
                            value={nichizi}
                        />
                        <TextField
                            label="メッセージ"
                            fullWidth={true}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <TextField required id="standard-required"
                            label="関連url"
                            defaultValue={messages.insta}
                            value={insta}
                            onChange={(e) => setInsta(e.target.value)}
                        />
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
                        {/* <Button
                            disabled={!clickable}
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{ marginTop: "16px" }}
                            onClick={() => handleUpload(myFiles)}
                        >
                            UPLOAD
                        </Button> */}
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