import React, { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import StarPaper from './StarPaper'

const Main = () => {
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
            })
    }, []
    );
    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
        // paper: {
        //     maxWidth: 400,
        //     margin: '5px 0px 5px 0px ',
        //     padding: '16px',
        //     boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        // },
    });
    const classes = useStyles();
    // const handleDelete = async () => {
    //     await
    //         db.collection("messages").where("message", "==", "")
    //             .get()
    //             .then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.delete();
    //                 })
    //             })
    // };

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
            {/* <button id="sendMessage" onClick={sendMessage} color="secondary">sendMessage</button> */}
        </div>
    );
};
export default Main;