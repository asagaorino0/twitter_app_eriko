import { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import StarPaper from './StarPaper'
import liff from '@line/liff';
// import "firebase/auth";
// import { useHistory } from 'react-router-dom';

const MySitar = () => {
    const [messages, setMessages] = useState('');


    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                // setNName(profile.displayName)
                // setName(profile.userId)
                // setAvatar(profile.pictureUrl)
                firebase
                    .firestore()
                    .collection("users")
                    .doc(`${profile.userId}`)
                    .collection("sitagaki")
                    .orderBy("nichi", "desc")
                    .onSnapshot((snapshot) => {
                        const sitagaki = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data()
                        });
                        // setSitarMsg(sitagaki)
                        setMessages(sitagaki)
                        // console.log(`${name}`, `${user.name}`)
                    })
            })
    }, []
    );
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    // useEffect(() => {
    //     setNName("おりのえりこ")
    //     setName("Ue990787da85bbd95eae9595867add9ba")
    //     setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
    //     firebase
    //         .firestore()
    //         .collection("users")
    //         .doc("Ue990787da85bbd95eae9595867add9ba")
    //         .collection("sitagaki")
    //         .orderBy("nichi", "desc")
    //         .onSnapshot((snapshot) => {
    //             const sitagaki = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data()
    //             });
    //             setMessages(sitagaki)
    //             console.log(`${name}`)

    //         })
    // }, []
    // );

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