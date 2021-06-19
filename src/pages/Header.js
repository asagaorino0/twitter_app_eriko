import React, { useState, useRef, useCallback } from 'react';
import firebase from '../config/firebase'
import { Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(11),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Header = () => {
    const db = firebase.firestore();
    const [avatar, setAvatar] = useState('');
    const [avatarG, setAvatarG] = useState('');
    const [nameG, setNameG] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [mochimono, setMochimono] = useState('');
    const [basyo, setBasyo] = useState('');
    const [ninzuu, setNinzuu] = useState('');
    const [zikan, setZikan] = useState('');
    const [day, setDay] = useState('');
    const [syugoZ, setSyugoZ] = useState('');
    const [syugoB, setSyugoB] = useState('');
    const [menu, setMenu] = useState('');
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
    //現在ログインしているユーザーを取得する
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const avatarG = (user?.photoURL)
            if (`${avatarG}` === 'null') {
                const email = (user?.email)
                setAvatar(`${email}`.charAt(0))
            }
            else {
                setAvatarG(`${avatarG}`)
            }
            const nameG = (user?.displayName)
            if (`${nameG}` !== 'null') {
                setNameG(`${nameG}`)
            } else {
                const email = (user?.email)
                setNameG(`${email}`)
            }
        }
    })
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            // setName('')
            setNameG('')
            setAvatar('')
            setAvatarG('')
            // setEmail('')
            // setPassword('')
            history.push('/')
        }).catch((error) => {
            var errorMessage = error.message;
        });
    }
    const myPage = () => {
        history.push('/MyPage')
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
                avatarG,
                time: now,
                insta: `${insta}`,
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
    });
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Toolbar>
                {`${avatarG}`.length !== 0 && (
                    <img
                        src={`${avatarG}`}
                        alt=""
                        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                    />
                )}
                {`${avatar}`.length !== 0 && (
                    <Avatar className={classes.green} >{avatar}</Avatar>
                )}
                <h5>{`${nameG}さん！ようこそ！！`}</h5>
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
                    {message.length !== 0 && (
                        <Toolbar >
                            <SendIcon onClick={handleCreate} />
                        </Toolbar>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {/* <Toolbar > */}
                        {/* <Grid item xs={10} > */}
                        <TextField
                            label="message"
                            fullWidth={true}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            autoFocus={true}
                        />
                        <TextField
                            label=""
                            type="datetime-local"
                            fullWidth={true}
                            onChange={(e) => setDay(e.target.value)}
                            value={day}
                            autoFocus={true}
                        />
                        {/* 
                            <TextField
                                label="時間"
                                fullWidth={true}
                                onChange={(e) => setZikan(e.target.value)}
                                value={zikan}
                            />
                            <TextField
                                label="集合時間"
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
                                label="持ち物"
                                fullWidth={true}
                                onChange={(e) => setMochimono(e.target.value)}
                                value={mochimono}
                            />
                            <TextField
                                label="e-mail"
                                fullWidth={true}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            /> */}
                        <TextField
                            label="instagram"
                            fullWidth={true}
                            onChange={(e) => setInsta(e.target.value)}
                            value={insta}
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
                    </CardContent>
                </Card>
                {/* </Accordion> */}
            </Accordion>
        </div>
    )
}

export default Header