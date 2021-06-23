import React, { useEffect, useState, useRef, useCallback } from 'react';
import firebase from '../config/firebase'
import { Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
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
import Icon from '@material-ui/core/Icon';

const Header = () => {
    const db = firebase.firestore();
    const [users, setUsers] = useState([]);
    const [avatar, setAvatar] = useState('');
    // const [avatarG, setAvatarG] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const { uid } = useParams();
    const [nameG, setNameG] = useState('');
    const [message, setMessage] = useState('');
    const [event, setEvent] = useState('');
    const [email, setEmail] = useState('');
    const [mochimono, setMochimono] = useState('');
    const [basyo, setBasyo] = useState('');
    const [ninzuu, setNinzuu] = useState('');
    const [nichizi, setNichizi] = useState('');
    const [daihyou, setDaihyou] = useState('');
    const [syugoZ, setSyugoZ] = useState('');
    const [syugoB, setSyugoB] = useState('');
    const [menu, setMenu] = useState('');
    const [insta, setInsta] = useState('');
    const [odai, setOdai] = useState('');
    const [koutuuhi, setKoutuuhi] = useState('');
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
        // await
        firebase
            .firestore()
            .collection("users").doc(`${uid}`).get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data())
                    setUsers(doc.data())
                    console.log(doc.id, " => ", users.nName)
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []
    );
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setNameG('')
            setAvatar('')
            // setAvatarG('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;
        });
    }
    const myPage = () => {
        history.push(`/MyPage/${uid}`)
    }
    const handleCreate = async () => {
        await
            db.collection('messages').add({
                name: nameG,
                message,
                src: `${src}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avatar,
                star: 0,
                time: now,
                insta: `${insta}`,
                event: `${event}`,
                email: `${email}`,
                mochimono: `${mochimono}`,
                basyo: `${basyo}`,
                ninzuu: `${ninzuu}`,
                nichizi: `${nichizi}`,
                daihyou: `${daihyou}`,
                syugoZ: `${syugoZ}`,
                syugoB: `${syugoB}`,
                odai: `${odai}`,
                koutuuhi: `${koutuuhi}`,
                menu: `${menu}`,
                myPage: false,
                sita: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docref) => {
                    // console.log("Document successfully written!:", docref.id);
                    setMessage("");
                    setSrc("");
                    setInsta("");
                    setMyFiles([]);
                    setClickable(false);
                    db.collection("messages").doc(docref.id).set({
                        id: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
    }
    const sitarId = async () => {
        await
            db.collection(nameG).add({
                name: nameG,
                message,
                src: `${src}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avatar,
                star: 0,
                // avatarG,
                time: now,
                insta: `${insta}`,
                event: `${event}`,
                email: `${email}`,
                mochimono: `${mochimono}`,
                basyo: `${basyo}`,
                ninzuu: `${ninzuu}`,
                nichizi: `${nichizi}`,
                daihyou: `${daihyou}`,
                syugoZ: `${syugoZ}`,
                syugoB: `${syugoB}`,
                menu: `${menu}`,
                myPage: true,
                sita: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docsita) => {
                    console.log("Document successfully written!:", docsita.id);
                    setMessage("");
                    setSrc("");
                    setInsta("");
                    setMyFiles([]);
                    setClickable(false);
                    db.collection(nameG).doc(docsita.id).set({
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
                {`${users.avatar}`.length !== 1 && (
                    <img
                        src={`${users.avatar}`}
                        alt=""
                        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                    />
                )}
                {`${users.avatar}`.length === 1 && (
                    <Avatar className={classes.green} >{users.avatar}</Avatar>
                )}
                <h5>{`${users.nName}さん！ようこそ！！`}</h5>
                <br />
                <Button variant="outlined" color="primary" onClick={myPage}>
                    MyPage
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
                                endIcon={<SendIcon />}
                            >
                                投稿
  </Button>
                        </Toolbar>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* <Toolbar > */}
                        {/* <Grid item xs={10} > */}
                        <TextField
                            label="イベント名"
                            fullWidth={true}
                            onChange={(e) => setEvent(e.target.value)}
                            value={event}

                        />
                        <TextField
                            label="代表者又はチーム名"
                            fullWidth={true}
                            onChange={(e) => setDaihyou(e.target.value)}
                            value={daihyou}
                        />
                        <TextField
                            label="日時"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            fullWidth={true}
                            onChange={(e) => setNichizi(e.target.value)}
                            value={nichizi}
                            autoFocus={true}
                        />

                        <TextField
                            label="集合時間"
                            type="time"
                            className={classes.textField}
                            fullWidth={true}
                            onChange={(e) => setSyugoZ(e.target.value)}
                            value={syugoZ}
                        />
                        <TextField
                            label="集合場所"
                            fullWidth={true}
                            onChange={(e) => setSyugoB(e.target.value)}
                            value={syugoB}
                        />
                        <TextField
                            label="開催場所"
                            fullWidth={true}
                            onChange={(e) => setBasyo(e.target.value)}
                            value={basyo}
                        />
                        <TextField
                            label="募集人数"
                            fullWidth={true}
                            onChange={(e) => setNinzuu(e.target.value)}
                            value={ninzuu}
                        />
                        <TextField
                            label="施術内容"
                            fullWidth={true}
                            onChange={(e) => setMenu(e.target.value)}
                            value={menu}
                        />
                        <TextField
                            label="料金"
                            fullWidth={true}
                            onChange={(e) => setOdai(e.target.value)}
                            value={odai}
                        />
                        <TextField
                            label="交通費"
                            fullWidth={true}
                            onChange={(e) => setKoutuuhi(e.target.value)}
                            value={koutuuhi}
                        />
                        <TextField
                            label="e-mail"
                            fullWidth={true}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <TextField
                            label="関連url"
                            fullWidth={true}
                            onChange={(e) => setInsta(e.target.value)}
                            value={insta}
                        />
                        <TextField
                            label="メッセージ"
                            fullWidth={true}
                            onChange={(e) => setEvent(e.target.value)}
                            value={message}
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
                        <Button
                            disabled={!clickable}
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{ marginTop: "16px" }}
                            onClick={() => handleUpload(myFiles)}
                        >
                            UPLOAD
                        </Button>
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
                                    endIcon={<SendIcon />}
                                >
                                    投稿
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