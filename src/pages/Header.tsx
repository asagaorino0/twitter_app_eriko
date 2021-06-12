import React, { useState, useRef, useContext } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Upload from "./Upload";
import SendIcon from '@material-ui/icons/Send';

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

    // const handlImg = async () => {
    // storageRef.child('images/stars.jpg').getDownloadURL().then(function(url) {
    //     // `url` is the download URL for 'images/stars.jpg'
    //     // This can be downloaded directly:
    //     var xhr = new XMLHttpRequest();
    //     xhr.responseType = 'blob';
    //     xhr.onload = function(event) {
    //       var blob = xhr.response;
    //     };
    //     xhr.open('GET', url);
    //     xhr.send();
    //     // Or inserted into an <img> element:
    //     var img = document.getElementById('myimg');
    //     img.src = url;
    //   }).catch(function(error) {
    //     // Handle any errors
    //   });
    // }

    const handleCreate = async () => {
        // if (e.key === 'Enter') {
        await
            db.collection('messages').add({
                name: nameG,
                message,
                src: "",
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                avatar,
                star: 0,
                avatarG,
                time: now
            })
                .then((docref) => {
                    // console.log("Document successfully written!:", docref.id);
                    setMessage("");
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
                    <SendIcon onClick={handleCreate} />
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
                        <Grid item>
                            {/* <Upload /> */}
                        </Grid>
                    </Toolbar>
                )}
            </AppBar>
            <Upload />
        </div>
    )
}

export default Header