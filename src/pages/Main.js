import React, { useEffect, useState, useContext, useRef } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from './Paper';
import StarPaper from './StarPaper'
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MessageListType } from '../types/MessageListType';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Link from '@material-ui/core/Link';
import { Store } from '../store/index'

const Main = () => {
    const { globalState, setGlobalState } = useContext(Store)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [names, setNames] = useState('');
    const [id, setId] = useState('');
    const [src, setSrc] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");

    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map((doc) => {
                    return doc.id &&
                        doc.data()
                    // doc.data().timestamp.toDate()
                });
                setMessages(messages);
                console.log(messages)
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


    // const deleteId = async () => {
    //     console.log(`${messages.id}`)
    //     // // const messages: MessageListType[] = [];
    //     // await
    //     //     db.collection("messages")
    //     //         .doc(`${messages.id}`)
    //     //         .delete()
    // };
    // const deleteId = async () => {
    //     await
    //         db.collection("messages").doc(`${messages.id}`).delete()
    // };


    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // var windowObjectReference;
    // var windowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    // const handleWindow = () => {
    //     windowObjectReference = window
    //         .open(`${messages.src}`,
    //             "",
    //             windowFeatures);
    // }

    return (
        <div>
            <Header />
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {

                        // return (
                        //     <Paper messages={messages} key={`${messages.id} `} />
                        // )
                        // if (name === messages.name) {
                        //     if (messages.star > 0)
                        //         return (
                        //             <MyStarPaper messages={messages} key={`${messages.id} `} />
                        //         )
                        //     else {
                        //         return (
                        //             <MyPaper messages={messages} key={`${messages.id} `} />
                        //         )
                        //     }
                        // }
                        // else 
                        // if (messages.star > 0)
                        return (
                            <StarPaper messages={messages} key={`${messages.id} `} />
                        )
                        // else {
                        //     return (
                        //         <Paper messages={messages} key={`${messages.id} `} />
                        //     )
                        // }
                    })
                }
            </div>
            {/* <button onClick={handle} color="secondary">delete</button> */}
            {/* <button onClick={handleWindow} color="secondary">open</button> */}
        </div>
    );
};
export default Main;