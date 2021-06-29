import React, { useEffect, useState, useContext, useRef } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import StarPaper from './StarPaper'
import liff from '@line/liff';

const MyStar = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
    const [messages, setMessages] = useState('');
    const [starMsg, setStarMsg] = useState([]);
    const [sitarMsg, setSitarMsg] = useState([]);
    const [followers, setFollowers] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
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
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(`${name}`)
            .collection('likes')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const likes = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setStarMsg(likes)
                setMessages(likes)
                // console.log(likes)
            })
    }, []
    );
    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
    });
    const classes = useStyles();
    return (
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
    );
};
export default MyStar;