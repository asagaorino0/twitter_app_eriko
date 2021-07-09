import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import StarPaper from './StarPaper'

const EventNow = () => {
    const [messages, setMessages] = useState('');
    const history = useHistory()
    const { messagesId } = useParams();
    useEffect(() => {
        console.log(messagesId)
        firebase
            .firestore()
            .collection("messages")
            .where("id", "==", `${messagesId}`)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data())
                    setMessages(doc.data())
                    console.log("tuuchi", doc.data())
                })
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
    const back = () => {
        history.push('/Main')
    }

    return (
        <div className={classes.root}>
            {/* {messages.length !== 0 &&
                messages
                    .filter((messages) => messages.myPage === false)
                    .map((messages, index) => { */}
            {/* return ( */}
            <StarPaper messages={messages} />
            <Button variant="contained" onClick={back}>
                募集中のイベント
            </Button>
        </div>
    );
};
export default EventNow;