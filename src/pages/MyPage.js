import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MyStar from './MyStar';
import MySitar from './MySitar';
import MyLoad from './MyLoad';
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import liff from '@line/liff';

const MyPage = () => {
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
                // firebase
                //     .firestore()
                //     .collection("users")
                //     .where("name", "==", `${name}`)//readnihenkousitemiru
                //     .onSnapshot((snapshot) => {
                //         const user = snapshot.docs.map((doc) => {
                //             return doc.id &&
                //                 doc.data()
                //         });
                //         setUser(user)
                //         console.log(user)
                db.collection("users").where("name", "==", `${name}`)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.id, " => ", doc.data())
                        })
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    })
                console.log("ユーザーのid:" + profile.displayName);
                console.log("ユーザーの名前:" + profile.userId);
                console.log("ユーザーの画像URL:" + profile.pictureUrl);
                console.log("{}", `${nName}`, `${avatar}`, `${name}`);
            })
        // })

    }, []
    );

    const handleChoice = async () => {
        await db.collection("users").where("name", "==", `${name}`)
            // await db.collection("users").where("born", "==", 1815)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data())
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }
    const sitarList = async () => {
    }
    const starList = async () => {
    }
    const loadList = async () => {
    }
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
        heading: {
            fontSize: 'typography.pxToRem(11)',
            fontWeight: 'typography.fontWeightRegular',
            color: 'black',
        },
    });
    const classes = useStyles();
    const back = () => {
        history.push('/Main')
    }

    return (
        <div>
            <Toolbar>
                {`${avatar}`.length !== 1 && (
                    <img
                        src={`${avatar}`}
                        alt=""
                        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                    />
                )}
                {`${avatar}`.length === 1 && (
                    <Avatar className={classes.green} >{avatar}</Avatar>
                )}
                <h5>{`${nName}さんのページ`}</h5>
                <Typography>
                    <Button variant="outlined" onClick={back}>
                        back
            </Button>
                </Typography>
            </Toolbar>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="button">
                        アカウントの設定
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* <MyPro /> */}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="button" onClick={sitarList}>
                        下書き保存したイベント
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MySitar />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="button" onClick={starList}>
                        ☆を付けたイベント
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MyStar />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} variant="button" onClick={loadList}>
                        投稿したイベント
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MyLoad />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
export default MyPage;