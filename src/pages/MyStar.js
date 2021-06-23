import React, { useEffect, useState, useContext, useRef } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StarPaper from './StarPaper'

const MyStar = () => {
    const [messages, setMessages] = useState('');
    const [starMsg, setStarMsg] = useState([]);
    const [sitarMsg, setSitarMsg] = useState([]);
    const [followers, setFollowers] = useState('');
    const history = useHistory()
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");
    const [likes, setLikes] = useState('');
    const { uid } = useParams();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(`${uid}`)
            .collection('likes')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const likes = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setStarMsg(likes)
                setMessages(likes)
                console.log(likes)
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
                    // .filter((messages) => messages.followers.uid === `${uid}`)
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