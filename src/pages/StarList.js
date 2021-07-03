import React, { useEffect, useState, useContext, useRef } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, Button } from '@material-ui/core';
// import Main from './pages/Main';
import StarIcon from '@material-ui/icons/Star';
import StarPaper from './StarPaper'
import { useHistory } from 'react-router-dom';
import Paper from './Paper';
import { Store } from '../store/index'
import Follower from './Follower'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MessageListType } from '../types/MessageListType';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Link from '@material-ui/core/Link';
// import Paper from '@material-ui/core/Paper';


const StarList = () => {
    const { globalState, setGlobalState } = useContext(Store)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarG, setAvatarG] = useState('');
    const [nameG, setNameG] = useState('');
    const [id, setId] = useState('');
    const [src, setSrc] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");

    const [likes, setLikes] = useState('');
    //現在ログインしているユーザーを取得する
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const avatarG = (user?.photoURL)
            if (`${avatarG}` === 'null') {
                const email = (user?.email)
                setAvatar(`${email}`.charAt(0))
            }
            else {
                setAvatar(`${avatarG}`)
            }
            const nameG = (user?.displayName)
            if (`${nameG}` !== 'null') {
                setName(`${nameG}`)
            } else {
                const email = (user?.email)
                setName(`${email}`)
            }
        }
    })
    // useEffect(() => {
    //     firebase
    //         .firestore()
    //         .collection("messages")
    //         .orderBy("timestamp", "desc")
    //         .onSnapshot((snapshot) => {
    //             const messages = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data()
    //             });
    //             setMessages(messages);

    //         })
    // }, []
    // );
    useEffect(() => {
        console.log(`${name}`)
        firebase
            .firestore()
            .collection(`${name}`)
            // .collection("messages")
            // .collection("おりのえりこ")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const likes = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                // setLikes(likes);
                setMessages(likes);
                console.log('likes1', messages)
                console.log('likes2', likes)
            })

    }, []
    );


    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
        paper: {
            maxWidth: 400,
            margin: '5px 0px 5px 0px ',
            padding: '16px',
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '5px 5px 5px 20px',
        },
        yellow: {
            color: 'yelloW',
        },
        formControl: {
            margin: 'spacing(1)',
            minWidth: '120px',
        },
        selectEmpty: {
            marginTop: 'spacing(2)',
        },
        pos: {
            marginBottom: 10,
        },
        pink: {
            color: '#fff',
            backgroundColor: 'pink',
        },
        largePink: {
            width: 'spacing(20)',
            height: 'spacing(20)',
            fontSize: '100px',
            color: '#fff',
            backgroundColor: 'pink',
        },
    });
    const classes = useStyles();
    const handleDelete = async () => {
        await
            db.collection("messages").where("message", "==", "")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    })
                })
    };
    const back = () => {
        // history.push('/Main')
    }

    // const deleteId = async () => {
    //     console.log(`${messages.id}`)
    //     // // const messages: MessageListType[] = [];
    //     // await
    //     //     db.collection("messages")
    //     //         .doc(`${messages.id}`)
    //     //         .delete()
    // };
    // const deleteId = async () => {
    //     await
    //         db.collection("messages").doc(`${messages.id}`).delete()
    // };


    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // var windowObjectReference;
    // var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    // const handleWindow = () => {
    //     windowObjectReference = window
    //         .open(`${messages.src}`,
    //             "",
    //             windowFeatures);
    // }

    return (
        <div className={classes.root}>
            <h5>{`${name}さんの☆イベント`}</h5>
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
                <h5>{`${name}さんの☆イベント`}</h5>
                <br />
                <Button variant="contained" onClick={back}>
                    back
            </Button>
            </Toolbar>
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages
                        // .filter((messages) => messages.id === "MFllvThrdZ8yfw1fTSIH")
                        .map((messages, index) => {
                            return (
                                <StarPaper messages={messages} key={`${messages.id} `} />
                            )
                        })
                }
            </div>
        </div>
    );
};
export default StarList;