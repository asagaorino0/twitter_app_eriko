import React, { useEffect, useState, useContext } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import StarPaper from './StarPaper'

const Main = () => {
    const myLiffId = "1656149559-xXM4l4Gp"
    const [id, setId] = useState('');
    const [src, setSrc] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");
    const [messages, setMessages] = useState('');
    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                });
                setMessages(messages);
                // console.log(messages)
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
    const handleWindow = () => {
        // if (liff.isApiAvailable('Uccd83a6500bba57ace57024cb31d5a1a')) {
        if (liff.isApiAvailable('Ue990787da85bbd95eae9595867add9ba')) {
            liff.shareTargetPicker([
                {
                    type: "text",
                    text: "Hello, World!"
                }
            ])
        }
    }

    return (
        <div>
            <Header />
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages
                        .filter((messages) => messages.myPage === false)
                        .map((messages, index) => {
                            return (
                                <StarPaper messages={messages} key={`${messages.id} `} />
                            )
                        })
                }
            </div>
            {/* <button onClick={               
            } color="secondary">readData</button> */}
            <button onClick={handleWindow} color="secondary">open</button>
        </div>
    );
};
export default Main;