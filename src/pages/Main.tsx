import React, { useEffect, useState, useContext, useRef } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MessageListType } from '../types/MessageListType';

const Main: React.FC<MessageListType> = () => {
    const [messages, setMessages] = useState<MessageListType[]>([]);
    useEffect(() => {
        firebase
            .firestore()
            .collection("messages")
            .orderBy("timestamp", "desc")
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
    const [message, setMessage] = useState<string>('');
    const [names, setNames] = useState<string>('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");
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
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Header />
            <div className={classes.root}>
                {messages.length !== 0 &&
                    messages.map((messages, index) => {
                        return (
                            // <Papers messages={messages} key={`${messages.id} `} />
                            <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    {messages.avatarG === "" &&
                                        <Grid item>
                                            <Avatar className={classes.pink} onClick={handleClick} >{messages.avatar} </Avatar>
                                            <img src={messages.src} alt="" style={{ width: '80px', height: '80px' }} />
                                        </Grid>
                                    }
                                    {messages.avatarG !== "" &&
                                        <Grid item>
                                            <img src={messages.avatarG} alt="" style={{ borderRadius: '50%', width: '40px', height: '40px' }} onClick={handleClick} />
                                            <img src={messages.src} alt="" style={{ width: '80px', height: '80px' }} />
                                        </Grid>
                                    }
                                    <Grid item xs>
                                        <Typography variant="h6" component="h6">
                                            {messages.name}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {messages.message}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {messages.time}
                                        </Typography>
                                    </Grid>
                                    <StarBorderIcon className={classes.yellow} />
                                    {/* <StarBorderIcon className={classes.yellow} onClick={starId} /> */}
                                </Grid>
                                <div>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {messages.avatarG === "0" &&
                                            <MenuItem onClick={handleClose} >
                                                <Avatar className={classes.largePink}>{messages.avatar} </Avatar>
                                            </MenuItem>
                                        }
                                        {messages.avatarG !== "0" &&
                                            <MenuItem onClick={handleClose}>
                                                <img src={messages.avatarG} alt="" style={{ borderRadius: '50%', width: '180px', height: '180px' }} />
                                            </MenuItem>
                                        }
                                        <MenuItem onClick={handleClose}>{messages.name}</MenuItem>
                                    </Menu>
                                </div>
                            </Paper>
                        )
                        // }
                    })
                }
            </div>
            <button onClick={handleDelete} color="secondary">delete</button>
        </div>
    );
};
export default Main;