import { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import Header from './Header';
import EventNow from './EventNow';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import liff from '@line/liff';

const Main = () => {
    const [messages, setMessages] = useState('');
    const [name, setName] = useState('');
    const [setNName] = useState('');
    const [setAvatar] = useState('');
    const [setFollowedId] = useState([]);
    const [state, setState] = useState('');

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
    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                firebase
                    .firestore()
                    .collection("messages")
                    .doc(messages.id)
                    .collection('follower')
                    .orderBy("timestamp", "desc")
                    .onSnapshot((snapshot) => {
                        const followedId = snapshot.docs.map((doc) => {
                            return doc.id &&
                                doc.data().uid
                        });
                        setFollowedId(followedId)
                        console.log("followedID", followedId)
                        console.log("name", `${name}`)
                        // console.log(followedId.includes("Ue990787da85bbd95eae9595867add9ba"))
                        console.log("state", followedId.includes(`${profile.userId}`))
                        setState(followedId.includes(`${profile.userId}`))
                    })
            })
    }, []
    );
    const eventNow = async () => {

    }
    const useStyles = makeStyles({
        heading: {
            fontSize: 'typography.pxToRem(11)',
            fontWeight: 'typography.fontWeightRegular',
            color: 'black',
        },
    });
    const classes = useStyles();

    return (
        <div>
            <Header />
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} variant="button" onClick={eventNow}>
                            募集中のイベント
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EventNow />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} variant="button" >
                            過去のイベント
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        工事中！
                    </AccordionDetails>
                </Accordion>
                {/* <Accordion>
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
                        < />
                    </AccordionDetails>
                </Accordion> */}
            </div>
        </div>
    );
};
export default Main;