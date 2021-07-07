import { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';
import StarPaper from './StarPaper'
import liff from '@line/liff';

const MyLoad = () => {
    const [messages, setMessages] = useState('');
    // const [loadMsg, setLoadMsg] = useState([]);
    // const [followers, setFollowers] = useState('');
    // const history = useHistory()
    // const db = firebase.firestore();
    // const doc = firebase.firestore();
    // var storage = firebase.app().storage("gs://my-custom-bucket");
    // const [user, setUser] = useState([]);
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');

    // 現在ログインしているユーザーを取得する
    // useEffect(() => {
    //     liff.getProfile()
    //         .then(profile => {
    //             // setNName(profile.displayName)
    //             // setName(profile.userId)
    //             // setAvatar(profile.pictureUrl)
    //             firebase
    //                 .firestore()
    //                 .collection("users")
    //                 .doc(`${profile.userId}`)
    //                 .collection('loadsita')
    //                 .orderBy("timestamp", "desc")
    //                 .onSnapshot((snapshot) => {
    //                     const loadsita = snapshot.docs.map((doc) => {
    //                         return doc.id &&
    //                             doc.data()
    //                     });
    //                     setMessages(loadsita)
    //                 })
    //         })
    // }, []
    // );
    // 現在ログインしているユーザーを取得する
    window.onload = function (e) {
        setNName("おりのえりこ")
        setName("Ue990787da85bbd95eae9595867add9ba")
        setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
        firebase
            .firestore()
            .collection("users")
            .doc("Ue990787da85bbd95eae9595867add9ba")
            .collection('loadsita')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const loadsita = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setMessages(loadsita)
            })
    }
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
                    // .filter((messages) => messages.name === `${name}` & messages.myPage === true)
                    .map((messages, index) => {
                        return (
                            <StarPaper messages={messages} key={`${messages.id} `} />
                        )
                    })
            }
        </div>
    );
};
export default MyLoad;