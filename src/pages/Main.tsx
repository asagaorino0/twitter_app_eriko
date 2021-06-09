import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom'
// import TextField from '@material-ui/core/TextField';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Header from './Header';
import Paper from './Paper'
import MyPaper from './MyPaper'
import StarPaper from './StarPaper'
import MyStarPaper from './MyStarPaper'
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import { Store } from '../store/index'
// import Fab from '@material-ui/core/Fab';
// import NavigationIcon from '@material-ui/icons/Navigation';
import { MessageListType } from '../types/MessageListType';
import { DockOutlined } from '@material-ui/icons';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { firebaseApp } from 'firebase/app';

const Main: React.FC<MessageListType> = () => {
    const [messages, setMessages] = useState<MessageListType[]>([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp")
            .onSnapshot((docs) => {
                const messages: MessageListType[] = [];
                // const messages = snapshot.docs.map((doc) => {//これは×
                docs.forEach(doc => {
                    messages.push(doc.data() as MessageListType);
                });
                console.log(messages)
                setMessages(messages);
            })
    }, []
    );



    // // const useStyles = makeStyles((theme) => ({
    const useStyles = makeStyles({
        root: {
            gridRow: 2,
            margin: '26px',
        },
        green: {
            color: '#fff',
            backgroundColor: 'green',
            margin: '5px 5px 5px 20px',
        },
        yellow: {
            color: 'yelloW',
            // backgroundColor: 'yelloW',
        },
        formControl: {
            margin: 'spacing(1)',
            minWidth: '120px',
        },
        selectEmpty: {
            marginTop: 'spacing(2)',
        },
    });
    // const { globalState, setGlobalState } = useContext(Store)
    const [message, setMessage] = useState<string>('');

    // const [names, setNames] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    // const { name } = useParams();
    // const { avatarG } = useParams();
    // const avatar = name.charAt(0);
    const date = new Date()
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth() + 1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)
    const h = ("00" + date.getHours()).slice(-2)
    const m = ("00" + date.getMinutes()).slice(-2)
    const s = ("00" + date.getSeconds()).slice(-2)
    const no = Y + '年' + M + '月' + D + '日 ' + h + ':' + m
    const handleCreate = () => {
        // const handleCreate = async (event) => {
        // if (event.key === 'Enter') {
        // await
        db.collection('messages').add({
            // name,
            message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // avatar,
            star: 0,
            // avatarG,
            time: no
        })
            .then((docref) => {
                // console.log("Document successfully written!:", docref.id);
                setMessage("");
                db.collection("messages").doc(docref.id).set({
                    id: docref.id,
                    //// capital: true //←上書きされないおまじない
                }, { merge: true }//←上書きされないおまじない
                )
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
        // }
    };



    // const messageEndRef = React.useRef();
    // const scrollToLatest = () =>
    //     messageEndRef.current.scrollIntoView({ behavior: "auto", block: "start", inline: "center" })
    // const handleDelete = async () => {
    //     await
    //         db.collection("messages").where("name", "==", name)
    //             .get()
    //             .then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.delete();
    //                 })
    //             })
    // };
    // const handleReset = async () => {
    //     // (() => {
    //     messageEndRef.current.scrollIntoView({ behavior: "auto", block: "start", inline: "center" })
    //     firebase
    //         .firestore()
    //         .collection("messages")
    //         .orderBy("timestamp")
    //         .onSnapshot((snapshot) => {
    //             const messages = snapshot.docs.map((doc) => {
    //                 return doc.id &&
    //                     doc.data()
    //                 // doc.data().timestamp.toDate()
    //             });
    //             setMessages(messages);
    //         })

    // };
    // const handleChoice = async (event) => {
    //     // = (event) => {
    //     setNames(event.target.value);
    //     console.log(names)
    //     await db.collection("messages").where("name", "==", `${names}`)
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach((doc) => {
    //                 console.log(doc.id, " => ", doc.data())
    //             })
    //         })
    //         .catch((error) => {
    //             console.log("Error getting documents: ", error);
    //         })
    // }
    // const starChoice = async () => {
    //     await db.collection("messages")
    //         .orderBy("star")
    //         .onSnapshot((snapshot) => {
    //             const messages = snapshot.docs
    //                 .filter((doc) => doc.data().star > 0)
    //                 .map((doc) => {
    //                     return doc.id &&
    //                         doc.data()
    //                 });
    //             setMessages(messages);
    //         })
    //     console.log(messages)
    // }

    const classes = useStyles();
    // const ref = useRef<HTMLDivElement>(null);

    return (
        <div>
            <Header />
            {/* <button onClick={scrollToLatest}>goto</button>
            <Fab variant="extended" onClick={scrollToLatest}>
                <NavigationIcon className={classes.extendedIcon} />
             Navigate
            </Fab> */}

            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {
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
                        // else if (messages.star > 0)
                        //     return (
                        //         <StarPaper messages={messages} key={`${messages.id} `} />
                        //     )
                        // else {
                        return (
                            <Paper messages={messages} key={`${messages.id} `} />
                        )
                        // }
                    })
                }
            </div>
            {/* <div style={{ display: 'flex', flexWrap: 'wrap' }} />
            <div className={classes.root}>
                {globalState.avater === '0' &&
                    <Avatar className={classes.green} >{avater}</Avatar>}
                {globalState.avater !== '0' &&
                    <img src={globalState.avater} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                }
                <Grid item xs={10}>
                    <TextField
                        // inputRef={ref}
                        ref={messageEndRef}
                        label="message"
                        fullWidth={true}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={handleCreate}
                        autoFocus={true}
                    />
                </Grid>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }} />
            <div className={classes.root} />
            <Avatar className={classes.yellow} onClick={starChoice} >★</Avatar>
            <button onClick={handleReset} color="secondary">reset</button>
            <button onClick={handleChoice} color="secondary">set</button>

            <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">Lock On</InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={names}
                    // onChange={(e) => setNames(e.target.value)}
                    // onKeyDown={handleChoice}
                    onChange={handleChoice}
                    className={classes.selectEmpty}
                > */}
            {/* {messages.length !== 0 && */}
            {
                messages.map((messages, index) => {
                    return (
                        <MenuItem value={messages.name} key={index}>
                            {messages.name}
                        </MenuItem>
                        // <h1>
                        //     {messages.name}
                        // </h1>
                    )
                })}
            {/* </Select> */}
            {/* <FormHelperText>Required</FormHelperText>
            {/* </FormControl>  */}


main




        </div>
    );
};
export default Main;