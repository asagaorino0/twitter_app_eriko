import React, { useState, useEffect, useCallback } from 'react';
import firebase from "firebase/app";
import { storage } from "../config/firebase";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import lineLogo from '../img/square-default.png';
import InstagramIcon from '@material-ui/icons/Instagram';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import RefreshIcon from '@material-ui/icons/Refresh'
import Follower from './Follower'
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import FolderIcon from '@material-ui/icons/Folder';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import TelegramIcon from '@material-ui/icons/Telegram';
import QueueIcon from '@material-ui/icons/Queue';
import liff from '@line/liff';
// import TouchAppIcon from '@material-ui/icons/TouchApp';
// import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
// import PanToolIcon from '@material-ui/icons/PanTool';
// import Avatar from '@material-ui/core/Avatar';
// import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import StarIcon from '@material-ui/icons/Star';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import PersonIcon from '@material-ui/icons/Person';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
        color: 'pink',
        // backgroundColor: 'pink',
    },
    green: {
        color: '#00b900',
        // color: '#06c775',
    },
    event: {
        cursor: 'pointer',
        textAlign: 'justify'
    }
}));

export default function SimplePaper({ messages }) {
    const classes = useStyles();
    const history = useHistory()
    const db = firebase.firestore();
    const [nichi, setNichi] = useState('');
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [url, setUrl] = useState(`${messages.url}`);
    const [event, setEvent] = useState(`${messages.event}`);
    const [limit, setLimit] = useState('');
    const [zi, setZi] = useState('');
    const [basyo, setBasyo] = useState('');
    const [message, setMessage] = useState(`${messages.message}`);
    const [followers, setFollowers] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [sanka, setSanka] = useState('');
    const [state, setState] = useState('');
    const [followedId, setFollowedId] = useState([]);
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const now = M + '???' + D + '??? ' + h + ':' + m
    const news = (Y + M + D) * 1
    var vYear = parseInt(`${nichi}`.substr(0, 4), 10);
    var vMonth = parseInt(`${nichi}`.substr(5, 2), 10);
    var vDay = parseInt(`${nichi}`.substr(8, 2), 10);
    var adate = (vYear * 10000 + vMonth * 100 + vDay);
    // const [checkedsanka, setCheckedSanka] = React.useState(`${state}`);
    // const [checkedsanka, setCheckedSanka] = React.useState(false);
    // const [setFollowed] = useState('');


    // // ?????????????????????????????????????????????????????????
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                firebase
                    .firestore()
                    .collection("messages")
                    .doc(messages.id)
                    .collection('follower')
                    .orderBy("timestamp", "desc")
                    .onSnapshot((snapshot) => {
                        const followedId = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data().uid
                        });
                        setFollowedId(followedId)
                        setState(followedId.includes(`${profile.userId}`))
                    })
                firebase
                    .firestore()
                    .collection("users")
                    .onSnapshot((snapshot) => {
                        const users = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data()
                        });
                        setUsers(users)
                        console.log(users)
                    })
            })
    }, []
    );
    // // ?????????????????????????????????????????????????????????
    // useEffect(() => {
    //     setNName("??????????????????")
    //     setName("Ue990787da85bbd95eae9595867add9ba")
    //     setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
    //     firebase
    //         .firestore()
    //         .collection("messages")
    //         .doc(messages.id)
    //         .collection('follower')
    //         .orderBy("timestamp", "desc")
    //         .onSnapshot((snapshot) => {
    //             const followedId = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data().uid
    //             });
    //             setFollowedId(followedId)
    //             setState(followedId.includes(`${name}`))
    //         })
    //     firebase
    //         .firestore()
    //         .collection("users")
    //         .onSnapshot((snapshot) => {
    //             const users = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data()
    //             });
    //             setUsers(users)
    //             load()
    //             // console.log(users)
    //         })
    // }, []
    // );
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
                news: `${news}`,
                limit: `${limit}`,
            }, { merge: true }//???????????????????????????????????????
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
        if (`${nichi}` === "") {
            setLimit(99999999)
        } else {
            setLimit(adate)
        }
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
                news: `${news}`,
                limit: `${limit}`,
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
                    }, { merge: true }//???????????????????????????????????????
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
                news: `${news}`,
                limit: messages.limit,
                url: messages.url,
                like: messages.like,
                sita: false,
                load: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                myPage: true,
            }, { merge: true }//???????????????????????????????????????
            )
                .then((docRef) => {
                    if (`${nichi}` === "") {
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
                            news: `${news}`,
                            limit: "99999999",
                            time: now,
                            url: messages.url,
                            like: messages.like,
                            sita: false,
                            load: true,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            myPage: false,
                        }, { merge: true }//???????????????????????????????????????
                        )
                    } else {
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
                            news: `${news}`,
                            limit: `${adate}`,
                            time: now,
                            url: messages.url,
                            like: messages.like,
                            sita: false,
                            load: true,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            myPage: false,
                        }, { merge: true }//???????????????????????????????????????
                        )
                    }
                    // console.log("Document written with ID: "`${messages.id}`);
                    window.alert("???????????????????????????????????????????????????????");
                    db.collection("users").doc(`${name}`).collection("sitagaki").doc(`${messages.id}`).delete()
                    history.push(`/EventTuuchi/${messages.id}`);
                    // history.push('/Main')
                })
    }
    const sitarId = async () => {
        try {
            // ????????????????????????
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
                news: `${news}`,
                limit: `${limit}`,
            }, { merge: true }//???????????????????????????????????????
            )
                .then((docRef) => {
                    setAnchorMl(null);
                    setMyFiles([]);
                    setClickable(false);
                    console.log("Document written with ID: ");
                })
    }
    const stardel = async () => {
        setSanka("")
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
        load()
        // console.log(followers.includes(`${name}`))
        // console.log("name", `${name}`)
    }
    const starId = async () => {
        db.collection("messages").doc(messages.id).collection('follower').doc(`${name}`).set({
            follower: `${avatar}`,
            followerName: `${nName}`,
            uid: `${name}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }//???????????????????????????????????????
        )
        if (`${nichi}` === "") {
            setLimit(99999999)
        } else {
            setLimit(adate)
        }
        await
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
                    news: `${news}`,
                    limit: messages.limit,
                    url: messages.url,
                    myPage: true,
                    sita: false,
                    like: true,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((docRef) => {
                    setSanka("????????????")
                    console.log(followers.includes(`${name}`))
                    console.log("name", `${name}`)
                    setState(followers.includes(`${name}`))
                    // console.log("Document written with ID: ")
                })
        load()
    }
    useEffect(() => {
        load()
    }, []
    );
    const load = function () {
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
                firebase
                    .firestore()
                    .collection("messages")
                    .doc(messages.id)
                    .collection('follower')
                    .orderBy("timestamp", "desc")
                    .onSnapshot((snapshot) => {
                        const followedId = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data().uid
                        });
                        setFollowedId(followedId)
                        // console.log("followedID", followedId)
                        // console.log("name", `${name}`)
                        // console.log(followedId.includes(`${name}`))
                        setState(followedId.includes(`${name}`))
                    })
            })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorMl, setAnchorMl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        // console.log(event.currentTarget)
        firebase
            .firestore()
            .collection("users")
            .where("name", "==", `${messages.name}`)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data())
                    setUser(doc.data())
                    // console.log(`${messages.id}`)
                })
            })
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

    const jyoho = `https://social-plugins.line.me/lineit/share?url=https://twitter-app-eriko.web.app&text=[${messages.event}]??????????????????`

    return (
        < Paper className={classes.paper} >
            <Grid container wrap="nowrap" spacing={1} >
                <Grid item style={{ cursor: 'pointer' }}>
                    <img src={messages.avatar} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                </Grid>
                <Grid item xs >
                    <Typography onClick={handleMessage} className={classes.event} variant="h6" component="h6" >
                        {messages.event}
                    </Typography>
                    <Typography onClick={handleMessage} className={classes.event} color="textSecondary">
                        {messages.message}
                    </Typography>
                    {`${messages.nichi}`.length !== 0 &&
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            ????????????{messages.nichi}
                        </Typography>
                    }
                    {`${messages.zi}`.length !== 0 &&
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            ?????????{messages.zi}
                        </Typography>
                    }
                    {`${messages.basyo}`.length !== 0 &&
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                            ?????????{messages.basyo}
                        </Typography>
                    }

                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        <img src={messages.src} alt="" style={{ width: '80px', height: 'auto' }} />
                    </Typography>
                    <Typography onClick={handleClick} style={{ cursor: 'pointer' }} className={classes.pos} color="textSecondary">
                        ????????????{messages.nName}
                    </Typography>
                    <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} variant="caption" color="textSecondary">
                        {messages.time}??????
                    </Typography>
                    {`${messages.url}`.length !== 0 &&
                        <Link href={messages.url} underline="none" target="_blank">
                            <h6>??????url:{messages.url}</h6>
                        </Link>
                    }
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
                        <Typography onClick={handleMessage} style={{ cursor: 'pointer' }} className={classes.event} variant="caption" color="textSecondary">
                            {state === false &&
                                <div style={{ whiteSpace: 'pre-line' }} justify="flex-start" alignItems="flex-start">
                                    <FavoriteBorder className={classes.pink} fontSize="large" onClick={starId} />
                                    {"????????????\n" + "??????????????????"}
                                </div>
                            }
                            {state === true &&
                                <div style={{ whiteSpace: 'pre-line' }} justify="flex-start" alignItems="flex-start">
                                    <FavoriteIcon className={classes.pink} fontSize="large" onClick={stardel} />
                                    {"???\n" + "??????????????????"}
                                </div>
                            }

                        </Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                        <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                            {followers.length !== 0 &&
                                followers.map((followers, index) => {
                                    return (
                                        <div>
                                            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                                                <Follower followers={followers} key={followers.id} />
                                                <Typography onClick={handleClick} style={{ cursor: 'pointer' }} variant="caption" >
                                                    {`${followers.followerName}`}
                                                </Typography>
                                            </Grid>
                                        </div>
                                    )
                                })
                            }
                            {followers.toString() === 'false' &&

                                <div>
                                    {/* <div style={{ whiteSpace: 'pre-line' }} justify="flex-start" alignItems="flex-start"> */}
                                            ???????????????????????????
                                        </div>

                            }
                        </Grid>
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
                                href={jyoho}
                                underline="none"
                                target="_blank"
                            ><img src={lineLogo} size="small" alt="LINE????????????????????????" style={{ width: '25px', height: '25px' }} />
                            </Link>
                        </div>
                    </Grid>
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
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    <MenuItem
                        onClick={handleClose}
                    >
                        <img src={`${messages.avatar}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                    </MenuItem>
                    <MenuItem>
                        <Grid item>
                            {/* <img src={messages.avatar} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} /> */}
                            <Link href={user.insta} underline="none" target="_blank">
                                {`${user.insta}`.toString() !== 'undefined' &&
                                    <InstagramIcon alt="insta" color="disabled" />
                                }
                            </Link>
                        </Grid>
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                    >{`${messages.nName}`}</MenuItem>
                    {`${user.nameY}`.toString() !== 'undefined' &&
                        <MenuItem
                            onClick={handleClose}
                        >{`${user.nameY}`}
                        </MenuItem>
                    }
                    {`${user.bunno1}`.toString() !== 'undefined' &&
                        <MenuItem
                            style={{ whiteSpace: "pre-wrap" }}
                            onClick={handleClose}
                        >{`${user.bunno1}`}
                        </MenuItem>
                    }
                </Menu>
            </div >
            {
                messages.myPage === true &&
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
                                <TextField
                                    label="??????"
                                    type="date"
                                    defaultValue={messages.nichi}
                                    fullWidth={true}
                                    onChange={(e) => setNichi(e.target.value)}
                                    value={nichi}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField
                                    label="??????"
                                    type="time"
                                    defaultValue={messages.zi}
                                    fullWidth={true}
                                    onChange={(e) => setZi(e.target.value)}
                                    value={zi}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="??????"
                                    // type="datetime-local"
                                    defaultValue={messages.Basyo}
                                    fullWidth={true}
                                    onChange={(e) => setBasyo(e.target.value)}
                                    value={basyo}
                                />
                            </MenuItem>
                            <MenuItem>
                                <TextField required id="standard-required"
                                    label="??????url"
                                    defaultValue={messages.url}
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </MenuItem>
                            <Card>
                                <CardContent>
                                    ??????????????????????????????????????????
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
                                    ??????
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
                                        ????????????
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
                                        ??????????????????
      </Button>}
                            </MenuItem>
                        </Menu>
                    }

                </div>
            }

            {/* {messages.myPage !== true &&
                <div>
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
                        <MenuItem>
                            <Grid item>
                                <Link href={user.insta} underline="none" target="_blank">
                                    {`${user.insta}`.length !== 0 &&
                                        <InstagramIcon alt="insta" color="disabled" />
                                    }
                                </Link>
                            </Grid>
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                        >{`${messages.nName}`}</MenuItem>
                        <MenuItem
                            onClick={handleClose}
                        >{`${user.nameY}`}</MenuItem>
                    </Menu>
                </div>
            } */}

        </Paper >
    );
}
