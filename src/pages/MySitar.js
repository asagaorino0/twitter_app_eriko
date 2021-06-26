import { useEffect, useState } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
    const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        firebase
            .auth().onAuthStateChanged(function (user) {
                if (user) {
                    if (`${user?.photoURL}` === 'null') {
                        setAvatar(`${user?.email}`.charAt(0))
                    }
                    else {
                        setAvatar(user?.photoURL)
                    }
                    if (`${user?.displayName}` !== 'null') {
                        setNName(`${user?.displayName}`)
                    } else {
                        setNName(`${user?.email}`)
                    }
                    setName(`${user?.uid}`)
                }
                firebase
                    .firestore()
                    .collection("users").doc(`${user?.uid}`).get().then((doc) => {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data())
                            setUser(doc.data())
                            // console.log(doc.id, " => ", user.nName)
                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    })
            })
    }, []
    )
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(`${user?.name}`)
            .collection("sitagaki")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const sitagaki = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setSitarMsg(sitagaki)
                setMessages(sitagaki)
                console.log(`${user?.name}`, `${user.name}`)
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
export default MySitar;