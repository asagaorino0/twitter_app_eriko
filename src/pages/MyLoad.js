import { useEffect, useState } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import StarPaper from './StarPaper'
import liff from '@line/liff';

const MyLoad = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
    const [messages, setMessages] = useState('');
    const [starMsg, setStarMsg] = useState([]);
    const [sitarMsg, setSitarMsg] = useState([]);
    const [loadMsg, setLoadMsg] = useState([]);
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
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                // console.log("ユーザーのid:" + profile.displayName);
                // console.log("ユーザーの名前:" + profile.userId);
                // console.log("ユーザーの画像URL:" + profile.pictureUrl);
                // console.log("{mypage}", `${nName}`, `${avatar}`, `${name}`);
                upload()
            })
    }, []
    );
    const upload = () => {
        console.log("id", `${name}`)
        firebase
            .firestore()
            .collection("users")
            .doc(`${name}`)
            // .doc("Ue990787da85bbd95eae9595867add9ba")
            .collection('loadsita')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const loadsita = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setLoadMsg(loadsita)
                setMessages(loadsita)
                console.log(loadsita)
                console.log(doc.id, doc.data)
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
            {/* myLoad */}
        </div>
    );
};
export default MyLoad;