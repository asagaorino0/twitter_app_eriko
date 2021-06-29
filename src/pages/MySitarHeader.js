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
import liff from '@line/liff';

const MySitarHeader = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
    const db = firebase.firestore();
    const [users, setUsers] = useState([]);
    const [avatar, setAvatar] = useState('');
    const [nName, setNName] = useState('');
    const [name, setName] = useState('');
    const [messages, setMessages] = useState('');
    const [sitarMsg, setSitarMsg] = useState([]);
    const { uid } = useParams();
    const [nameG, setNameG] = useState('');
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
    const [message, setMessage] = useState('');
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
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                firebase
                    .firestore()
                    .collection("users")
                    .where("name", "==", `${name}`)
                    .onSnapshot((snapshot) => {
                        const user = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data()
                        });
                        setUser(user)
                        console.log(user)
                    })
            })

    }, []
    );
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
    const sitarId = async () => {
        console.log('messages:', messages.id)
        await
            db.collection("messages")
                .doc(messages.id)
                .set({
                    hensyu: true,
                }, { merge: true }//←上書きされないおまじない
                )
    }

    return (
        <div>
            {
                messages.length !== 0 &&
                messages
                    .map((messages, index) => {
                        return (
                            <div className={classes.root}>
                                <Typography className={classes.heading} variant="button" >イベントの編集   </Typography>
                                <Typography>
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="関連url"
                                        fullWidth={true}
                                        onChange={(e) => setInsta(e.target.value)}
                                        defaultValue={messages.insta}
                                    />
                                    <TextField
                                        required
                                        id="standard-required"
                                        label="メッセージ"
                                        fullWidth={true}
                                        onChange={(e) => setMessage(e.target.value)}
                                        defaultValue={messages.message}
                                    />
                                </Typography>

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
                                        <Toolbar >
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

                                    </CardContent>
                                </Card>
                            </div >
                        )
                    })
            }
        </div >
    )
}
export default MySitarHeader