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
import InfoList from './InfoList';

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
                {/* <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} variant="button" onClick={eventNow}>
                            募集中のイベント
                    </Typography>
                    </AccordionSummary>
                    <AccordionDetails> */}
                <InfoList />
                {/* <EventNow /> */}
                {/* </AccordionDetails>
                </Accordion> */}
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