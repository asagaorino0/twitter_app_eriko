import { useEffect, useState } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StarPaper from './StarPaper'

const MySitar = () => {
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
    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        firebase
            .firestore()
            .collection("users").doc(`${uid}`).get().then((doc) => {
                if (doc.exists) {
                    // console.log("Document data:", doc.data())
                    setUsers(doc.data())
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []
    );
    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const sitagaki = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                    // doc.data().timestamp.toDate()
                });
                setSitarMsg(sitagaki)
                setMessages(sitagaki)
                console.log(sitagaki)
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
                    // .filter((messages) => messages.myPage === true)
                    .filter((messages) => messages.name === `${uid}` & messages.myPage === true)
                    .map((messages, index) => {
                        return (
                            <StarPaper messages={messages} key={`${messages.id} `} />
                        )
                    })
            }
        </div>
    );
};
export default MySitar;