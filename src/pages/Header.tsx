import React, { useState, useRef, useCallback } from 'react';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Upload from "./Upload";
import SendIcon from '@material-ui/icons/Send';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { storage } from "../config/firebase";
import FolderIcon from '@material-ui/icons/Folder';

const Header: React.FC<{}> = () => {
    const db = firebase.firestore();
    const [avatar, setAvatar] = useState<string>('');
    const [avatarG, setAvatarG] = useState<string>('');
    const [nameG, setNameG] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const ref = useRef<HTMLDivElement>(null);
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
    const handleCreate = async () => {
        // if (e.key === 'Enter') {
        await
            db.collection('messages').add({
                name: nameG,
                message,
                src: `${src}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avatar,
                star: 0,
                avatarG,
                time: now
            })
                .then((docref) => {
                    // console.log("Document successfully written!:", docref.id);
                    setMessage("");
                    setSrc("");
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
    // }
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const [clickable, setClickable] = useState(false);
    const [src, setSrc] = useState("");
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
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
    const handleUpload = async (accepterdImg: any) => {
        try {
            // アップロード処理
            const uploadTask: any = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]);
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
        }
        catch (error) {
        }
    };
    const handlePreview = (files: any) => {
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
            setSrc(reader.result as string);
        };
    };

    return (
        <div>
            {nameG !== 'null' && (
                <Toolbar>
                    {`${avatarG}`.length !== 0 && (
                        <img
                            src={`${avatarG}`}
                            alt=""
                            style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                        />
                    )}
                    {`${avatar}`.length !== 0 && (
                        <Avatar>{avatar}</Avatar>
                    )}
                    <h3>{`${nameG}さん！ようこそ！！`}</h3>
                    <br />
                    <Button variant="contained" onClick={signOut}>
                        Logout
            </Button>
                </Toolbar>
            )}
            <AppBar position="static">
                {nameG.length !== 0 && (
                    <Toolbar>
                        <Grid item xs={10}>
                            <TextField
                                // inputRef={ref}
                                // ref={messageEndRef}
                                label="message"
                                fullWidth={true}
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                // onKeyDown={handleCreate}
                                autoFocus={true}
                            />
                        </Grid>
                        <SendIcon onClick={handleCreate} />
                        <Grid item>
                            {/* <Upload /> */}
                        </Grid>
                    </Toolbar>
                )}
            </AppBar>
            {/* <Upload /> */}
            <Card>
                <CardContent>
                    <Typography variant="h6">ファイルを添付</Typography>
                    {/* <p>File should be Jpeg, Png,...</p> */}
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {myFiles.length === 0 ? (
                            <p >
                                {/* <Avatar> */}
                                <FolderIcon />
                                {/* </Avatar> */}
                            </p>
                        ) : (
                            <div style={{ width: '180px', height: '180px' }}>
                                {myFiles.map((file: File) => (
                                    <React.Fragment key={file.name}>
                                        {src && <img src={src} />}
                                    </React.Fragment>
                                ))}
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
        </div>
    )
}

export default Header