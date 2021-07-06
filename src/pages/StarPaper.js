import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase/app";
import lineLogo from '../img/square-default.png';
import PanToolIcon from '@material-ui/icons/PanTool';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Follower from './Follower'
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { storage } from "../config/firebase";
import FolderIcon from '@material-ui/icons/Folder';
import RefreshIcon from '@material-ui/icons/Refresh';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import TelegramIcon from '@material-ui/icons/Telegram';
import QueueIcon from '@material-ui/icons/Queue';
import liff from '@line/liff';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: 'spacing(0, 0)',
        backgroundColor: '#fff',
    },
    paper: {
        maxWidth: 400,
        margin: '5px 0px 5px 0px ',
        padding: '12px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    pos: {
        marginBottom: 0,
    },
    pink: {
        color: '#fff',
        backgroundColor: 'pink',
    },
    followPink: {
        color: '#fff',
        backgroundColor: 'pink',
        fontSize: '10px',
        borderRadius: '50%',
        width: '20px',
        height: '20px'
    },
    yellow: {
        color: 'yelloW',
        // backgroundColor: 'yelloW',
    },
    largePink: {
        width: '40px',
        height: '40px',
        color: '#fff',
        backgroundColor: 'pink',
    },
}));

export default function SimplePaper({ messages }) {
    const classes = useStyles();
    const history = useHistory()
    const db = firebase.firestore();
    // const doc = firebase.firestore();
    // const follower = firebase.firestore();
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const now = Y + '年' + M + '月' + D + '日 ' + h + ':' + m
    // const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [url, setUrl] = useState(`${messages.url}`);
    const [event, setEvent] = useState(`${messages.event}`);
    const [nichi, setNichi] = useState('');
    const [zi, setZi] = useState('');
    const [basyo, setBasyo] = useState('');
    const [message, setMessage] = useState(`${messages.message}`);
    const [followers, setFollowers] = useState('');
    // const [setFollowed] = useState('');
    const [followedId, setFollowedId] = useState('');

    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                // console.log("ユーザーのid:" + profile.displayName);
                // console.log("ユーザーの名前:" + profile.userId);
                // console.log("ユーザーの画像URL:" + profile.pictureUrl);
                // console.log("{myStar}", `${nName}`, `${avatar}`, `${name}`);
                // firebase
                //     .firestore()
                //     .collection("users")
                //     .doc(`${name}`)
                //     .collection('likes')
                //     .orderBy("timestamp", "desc")
                //     .onSnapshot((snapshot) => {
                //         const followed = snapshot.docs.map((doc) => {
                //             return doc.id &&
                //                 doc.data()
                //         });
                //         setFollowed(followed)
                //         console.log("followed", followed)
                // })
            })
    }, []
    );
    const likeSitarId = async () => {
        console.log('messages:', messages.id)
        await
            db.collection("users").doc(`${messages.name}`).collection("sitagaki").doc(`${messages.id}`).set({
                id: messages.id,
                name: `${name}`,
                nName: messages.nName,
                avatar: messages.avatar,
                event: `${event}`,
                message: `${message}`,
                nichi: `${nichi}`,
                zi: `${zi}`,
                basyo: `${basyo}`,
                src: `${src}`,
                url: `${url}`,
                myPage: true,
                like: messages.like,
                sita: true,
                load: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                time: now,
            }, { merge: true }//←上書きされないおまじない
            )
                .then((docRef) => {
                    setAnchorMl(null);
                    setMyFiles([]);
                    setClickable(false);
                    console.log("Document written with ID: ");
                })
        db.collection("users").doc(`${name}`).collection("load").doc(`${messages.id}`).delete()
    };
    const deleteId = async () => {
        console.log('messages:', messages.id)
        await
            db.collection("users").doc(`${name}`).collection("sitagaki").doc(`${messages.id}`).delete()
    };
    const deleteLike = async () => {
        console.log('messages:', messages.id)
        await
            db.collection("users").doc(`${name}`).collection("likes").doc(`${messages.id}`).delete()
    };
    const copyId = async () => {
        await
            db.collection("users").doc(`${name}`).collection("sitagaki").add({
                name: `${name}`,
                nName: messages.nName,
                avatar: messages.avatar,
                event: messages.event,
                message: messages.message,
                nichi: messages.nichi,
                zi: messages.zi,
                basyo: messages.basyo,
                src: messages.src,
                url: messages.url,
                time: now,
                myPage: true,
                like: messages.like,
                sita: true,
                load: messages.load,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docref) => {
                    console.log("Document successfully written!:", docref.id);
                    db.collection("users").doc(`${name}`).collection("sitagaki").doc(docref.id).set({
                        id: docref.id,
                    }, { merge: true }//←上書きされないおまじない
                    )
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                })
    }
    const loadId = async () => {
        await
            db.collection("users").doc(`${name}`).collection("loadsita").doc(`${messages.id}`).set({
                id: messages.id,
                event: messages.event,
                name: `${name}`,
                nName: messages.nName,
                message: messages.message,
                nichi: messages.nichi,
                zi: messages.zi,
                basyo: messages.basyo,
                src: messages.src,
                avatar: messages.avatar,
                time: now,
                url: messages.url,
                like: messages.like,
                sita: false,
                load: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                myPage: true,
            }, { merge: true }//←上書きされないおまじない
            )
                .then((docRef) => {
                    db.collection("messages").doc(messages.id).set({
                        id: messages.id,
                        event: messages.event,
                        name: `${name}`,
                        nName: messages.nName,
                        message: messages.message,
                        nichi: messages.nichi,
                        zi: messages.zi,
                        basyo: messages.basyo,
                        src: messages.src,
                        avatar: messages.avatar,
                        time: now,
                        url: messages.url,
                        like: messages.like,
                        sita: false,
                        load: true,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        myPage: false,
                    }, { merge: true }//←上書きされないおまじない
                    )
                    // console.log("Document written with ID: "`${messages.id}`);
                    db.collection("users").doc(`${name}`).collection("sitagaki").doc(`${messages.id}`).delete()

                    history.push('/Main')
                })
    }

    const stardel = async () => {
        await
            db.collection("messages")
                .doc(messages.id)
                .collection('follower')
                .where("uid", "==", `${name}`)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
        db.collection("users")
            .doc(`${name}`)
            .collection("likes")
            .where("id", "==", `${messages.id}`)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                })
            })
        console.log(followers.includes(`${name}`))
        console.log("name", `${name}`)
    }
    const starId = async () => {
        db.collection("messages").doc(messages.id).collection('follower').doc(`${name}`).set({
            follower: `${avatar}`,
            followerName: `${nName}`,
            uid: `${name}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }//←上書きされないおまじない
        )
        db.collection("users").doc(`${name}`).collection("likes").doc(`${messages.id}`)
            .set({
                id: messages.id,
                event: messages.event,
                name: `${name}`,
                nName: messages.nName,
                message: messages.message,
                nichi: messages.nichi,
                zi: messages.zi,
                basyo: messages.basyo,
                src: messages.src,
                avatar: messages.avatar,
                time: now,
                url: messages.url,
                myPage: true,
                sita: false,
                like: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((docRef) => {
                console.log("Document written with ID: ");
                // firebase
                //     .firestore()
                //     .collection("users")
                //     .doc(`${name}`)
                //     .collection('likes')
                //     .orderBy("timestamp", "desc")
                //     .onSnapshot((snapshot) => {
                //         const followed = snapshot.docs.map((doc) => {
                //             return doc.id &&
                //                 doc.data()
                //         });
                //         setFollowed(followed)
                //         console.log("followed", followed)
                //     })
                // console.log(followers.includes(`${name}`))
                // console.log("name", `${name}`)
            })
    }

    const sitarId = async () => {
        try {
            // アップロード処理
            const uploadTask = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
        }
        catch (error) {
        }
        await
            db.collection("users").doc(`${messages.name}`).collection("sitagaki").doc(`${messages.id}`).set({
                id: messages.id,
                event: `${event}`,
                message: `${message}`,
                nichi: `${nichi}`,
                zi: `${zi}`,
                basyo: `${basyo}`,
                src: `${src}`,
                url: `${url}`,
                myPage: true,
                like: messages.like,
                // sita:true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                time: now,
            }, { merge: true }//←上書きされないおまじない
            )
                .then((docRef) => {
                    setAnchorMl(null);
                    setMyFiles([]);
                    setClickable(false);
                    console.log("Document written with ID: ");
                })
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .doc(messages.id)
            .collection('follower')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const followers = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setFollowers(followers)
                console.log("followers", followers)
            })
        firebase
            .firestore()
            .collection("messages")
            .doc(messages.id)
            .collection('follower')
            .onSnapshot((snapshot) => {
                const followedId = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.id()
                    // doc.data()
                });
                setFollowedId(followedId)
                console.log("followers", followedId)
            })
    }, []
    );

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorMl, setAnchorMl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMessage = (event) => {
        setAnchorMl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorMl(null);
    };

    const [myFiles, setMyFiles] = useState([]);
    const [clickable, setClickable] = useState(false);
    const [src, setSrc] = useState(`${messages.src}`);
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
    return (
        < Paper className={classes.paper} >
            <Grid container wrap="nowrap" spacing={1} >
                {`${messages.avatar}`.length === 1 &&
                    <Grid item >
                        <Avatar className={classes.pink} onClick={handleClick} >{messages.avatar} </Avatar>
                    </Grid>
                }
                {`${messages.avatar}`.length !== 1 &&
                    <Grid item>
                        <img src={messages.avatar} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                    </Grid>
                }
                <Grid item xs >
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} variant="h6" component="h6" >
                        {messages.event}
                    </Typography>
                    {`${messages.nichi}`.length !== 0 &&
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            年月日：{messages.nichi}
                        </Typography>
                    }
                    {`${messages.zi}`.length !== 0 &&
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            時間：{messages.zi}
                        </Typography>
                    }
                    {`${messages.basyo}`.length !== 0 &&
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            場所：{messages.basyo}
                        </Typography>
                    }
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        {messages.message}
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        <img src={messages.src} alt="" style={{ width: '80px', height: 'auto' }} />
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        投稿者：{messages.nName}
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} variant="caption" color="textSecondary">
                        {messages.time}更新
                    </Typography>
                    {`${messages.url}`.length !== 0 &&
                        <Link href={messages.url} underline="none" target="_blank">
                            <h6>関連url:{messages.url}</h6>
                        </Link>
                    }
                    <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                        {followedId.includes(`${name}`) === false &&
                            <StarBorderIcon className={classes.yellow} onClick={starId} />
                        }
                        {followedId.includes(`${name}`) !== false &&
                            <StarIcon className={classes.yellow} onClick={stardel} />
                        }
                        <StarIcon className={classes.yellow} onClick={stardel} />

                        {followers.length !== 0 &&
                            followers.map((followers, index) => {
                                return (
                                    <div>
                                        <Follower followers={followers} key={followers.id} />
                                    </div>
                                )
                            })
                        }
                    </Grid>

                </Grid>
                {messages.sita === true &&
                    <Grid item>
                        <DeleteIcon color="disabled" onClick={deleteId} title="del" />
                        <QueueIcon color="disabled" onClick={copyId} title="copy" />
                        <TelegramIcon color="disabled" onClick={loadId} title="upload" />
                    </Grid>
                }
                {messages.like === true &&
                    <Grid item>
                        <DeleteIcon color="disabled" onClick={deleteLike} title="del" />
                    </Grid>
                }
                {messages.name === `${name}` &&
                    <Grid item>
                        <div>
                            <Link
                                href="https://social-plugins.line.me/lineit/share?url=https://twitter-app-eriko.web.app"
                                underline="none"
                                target="_blank"
                                style={{ width: '25px', height: '25px' }}
                            ><img src={lineLogo} size="small" alt="LINEメッセージを送る" />
                            </Link>
                        </div>                                </Grid>
                }
            </Grid>

            <div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    fullWidth={true}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {`${messages.avatar}`.length === 1 &&
                        <MenuItem
                            onClick={handleClose}
                        >
                            <Avatar className={classes.largePink}>{messages.avatar} </Avatar>
                        </MenuItem>
                    }
                    {`${messages.avatar}`.length !== 1 &&
                        <MenuItem
                            onClick={handleClose}
                        >
                            <img src={`${messages.avatar}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                        </MenuItem>
                    }
                    <MenuItem
                        onClick={handleClose}
                    >{`${messages.nName}`}</MenuItem>
                </Menu>
            </div>
            {messages.myPage === true &&
                <div>
                    {messages.like !== true &&
                        <Menu
                            id="simple-menu"
                            direction="culm"
                            fullWidth={true}
                            anchorMl={anchorMl}
                            keepMounted
                            open={Boolean(anchorMl)}
                            onClose={handleClose}
                        >
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="event"
                                    defaultValue={messages.event}
                                    value={event}
                                    onChange={(e) => setEvent(e.target.value)}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="message"
                                    defaultValue={messages.message}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </MenuItem>

                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="年月日"
                                    // type="datetime-local"
                                    defaultValue={messages.nichi}
                                    fullWidth={true}
                                    onChange={(e) => setNichi(e.target.value)}
                                    value={nichi}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="時間"
                                    // type="datetime-local"
                                    defaultValue={messages.zi}
                                    fullWidth={true}
                                    onChange={(e) => setZi(e.target.value)}
                                    value={zi}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="場所"
                                    // type="datetime-local"
                                    defaultValue={messages.Basyo}
                                    fullWidth={true}
                                    onChange={(e) => setBasyo(e.target.value)}
                                    value={basyo}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="関連url"
                                    defaultValue={messages.url}
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </MenuItem>
                            <Card>
                                <CardContent>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()}
                                        />
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
                                </CardContent>
                            </Card>
                            <MenuItem onClick={handleClose}>
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<NavigateBeforeIcon color="secondary" />}
                                    onClick={handleClose}
                                >
                                    戻る
      </Button>
                                {messages.sita === true &&
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        size="small"
                                        startIcon={<RefreshIcon />}
                                        onClick={sitarId}
                                    >
                                        更新する
      </Button>}
                                {messages.sita !== true &&
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        size="small"
                                        startIcon={<NavigateBeforeIcon />}
                                        onClick={likeSitarId}
                                    >
                                        下書きに戻す
      </Button>}
                            </MenuItem>
                        </Menu>
                    }

                </div>}

            {messages.myPage !== true &&
                <div>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorMl}
                        keepMounted
                        open={Boolean(anchorMl)}
                        onClose={handleClose}
                    >
                        {`${messages.avatar}`.length === 1 &&
                            <MenuItem onClick={handleClose} >
                                <Avatar className={classes.largePink}>{messages.avatar} </Avatar>
                            </MenuItem>
                        }
                        {`${messages.avatar}`.length !== 1 &&
                            <MenuItem onClick={handleClose}>
                                <img src={`${messages.avatar}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                            </MenuItem>
                        }
                        <MenuItem onClick={handleClose}>
                            <img src={messages.src} alt="" style={{ width: '180px', height: 'auto' }} />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>{`${messages.nName}`}</MenuItem>
                    </Menu>
                </div>
            }

        </Paper >
    );
}
