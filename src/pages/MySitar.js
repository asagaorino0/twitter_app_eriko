import { useEffect, useState } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import StarPaper from './StarPaper'
import liff from '@line/liff';

const MySitar = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
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
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                // console.log("{header}", `${nName}`, `${avatar}`, `${name}`);
            })

    }, []
    );
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(`${name}`)
            .collection("sitagaki")
            // .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const sitagaki = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setSitarMsg(sitagaki)
                setMessages(sitagaki)
                console.log(`${name}`, `${user.name}`)
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