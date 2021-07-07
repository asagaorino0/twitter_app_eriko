import { useEffect, useState } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import StarPaper from './StarPaper'

const EventNow = () => {
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
    });
    const classes = useStyles();

    return (
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
    );
};
export default EventNow;