import React, { useEffect, useState, useContext, useRef } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarPaper from './StarPaper'
import Paper from './Paper';
import { Store } from '../store/index'
import Follower from './Follower'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const MyPage = () => {
    const { globalState, setGlobalState } = useContext(Store)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [name, setName] = useState('');
    const history = useHistory()
    // const { name } = useParams();
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
    const starList = async () => {
        //     await
        // useEffect(() => {
        console.log(`${name}`)
        firebase
            .firestore()
            .collection(name)
            // .collection("messages")
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
    }
    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '5px 5px 5px 20px',
        },
        yellow: {
            color: 'yelloW',
        },
        pink: {
            color: '#fff',
            backgroundColor: 'pink',
        },
    });
    const classes = useStyles();
    const back = () => {
        history.push('/Main')
    }

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
                <h5>{`${name}さんのページ`}</h5>
                <br />
                <Button variant="outlined" color="primary" onClick={starList}>
                    {/* <Button variant="contained" onClick={readData}> */}
                ☆イベント
            </Button>
                <Button variant="outlined" onClick={back}>
                    back
            </Button>
            </Toolbar>
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages
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
export default MyPage;