import { useEffect, useState } from 'react';
import "firebase/firestore";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import MyPro from './MyPro';
import MyStar from './MyStar';
import MySitar from './MySitar';
import MyLoad from './MyLoad';
import { Toolbar, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import liff from '@line/liff';

const MyPage = () => {
    const history = useHistory()
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
            })
    }, []
    );
    // useEffect(() => {
    //     setNName("おりのえりこ")
    //     setName("Ue990787da85bbd95eae9595867add9ba")
    //     setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
    //     // console.log(name, nName)
    // }, []
    // );
    const sitarList = async () => {
    }
    const starList = async () => {
    }
    const loadList = async () => {
    }
    const useStyles = makeStyles({
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
                <img
                    src={`${avatar}`}
                    alt=""
                    style={{ borderRadius: '50%', width: '40px', height: '40px' }}
                />
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
                    <Typography className={classes.heading} variant="button" onClick={starList}>
                        アカウント設定
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
                    <Typography className={classes.heading} variant="button" onClick={starList}>
                        参加イベント
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