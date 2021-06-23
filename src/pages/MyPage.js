import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MyPro from './MyPro';
import MyStar from './MyStar';
import MySitar from './MySitar';
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, Button } from '@material-ui/core';
// import StarIcon from '@material-ui/icons/Star';
import StarPaper from './StarPaper'
// import Paper from './Paper';
// import { Store } from '../store/index'
// import Follower from './Follower'
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const MyPage = () => {
    // const { globalState, setGlobalState } = useContext(Store)
    // const [message, setMessage] = useState('');
    const [messages, setMessages] = useState('');
    const [starMsg, setStarMsg] = useState([]);
    const [sitarMsg, setSitarMsg] = useState([]);
    const [followers, setFollowers] = useState('');
    // const [name, setName] = useState('');
    // const [nName, setNName] = useState('');
    const history = useHistory()
    // const [pro, setPro] = useState(false);
    // const [avatar, setAvatar] = useState('');
    // const [nameG, setNameG] = useState('');
    // const [id, setId] = useState('');
    // const [src, setSrc] = useState('');
    // const [avatarG, setAvatarG] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    var storage = firebase.app().storage("gs://my-custom-bucket");
    // const follower = firebase.firestore();
    const [likes, setLikes] = useState('');

    const { uid } = useParams();
    const [users, setUsers] = useState([]);
    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        firebase
            .firestore()
            .collection("users").doc(`${uid}`).get().then((doc) => {
                if (doc.exists) {
                    // console.log("Document data:", doc.data())
                    setUsers(doc.data())
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []
    );

    const starList = async () => {
    }

    const sitarList = async () => {
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
        history.push(`/Main/${uid}`)
    }

    return (
        <div>
            <Toolbar>
                {`${users.avatar}`.length !== 1 && (
                    <img
                        src={`${users.avatarG}`}
                        alt=""
                        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                    />
                )}
                {`${users.avatar}`.length === 1 && (
                    <Avatar className={classes.green} >{users.avatar}</Avatar>
                )}
                <h5>{`${users.nName}さんのページ`}</h5>
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
                    <MyPro />
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
        </div>
    );
};
export default MyPage;