import React, { useState, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTodo, add_todo, all_delete, del_todo, DONE_LIST, check_list } from './todoSlice';
// import Checkbox from '@material-ui/core/Checkbox';
import styles from './Counter.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import { AppBar, Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import logo from '../img/0730.jpg';
import { setuid } from 'process';

// export function Login() {
const MyPro = () => {
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
        },
        avatar: {
            margin: theme.spacing(7),
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        red: {
            color: 'red',
        },
        green: {
            color: 'green',
        },
        root: {
            gridRow: 2,
            margin: '26px',
            textAlign: 'left',
        },
    }));
    const classes = useStyles();
    const [pro, setPro] = useState(false);
    const [betsumei, setBetsumei] = useState();
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [uid, setUid] = useState('');
    const [nameG, setNameG] = useState('');
    const [nName, setNName] = useState('')
    const [nyuryokuName, setNyuryokuName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useHistory()
    const [avatarG, setAvatarG] = useState('');
    const db = firebase.firestore();
    const doc = firebase.firestore();
    // const [value, setValue] = React.useState(`${nName}`);
    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };
    //現在ログインしているユーザーを取得する
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const avatarG = (user?.photoURL)
            if (`${avatarG}` === 'null') {
                const email = (user?.email)
                setAvatar(`${email}`.charAt(0))
            }
            else {
                setAvatar(`${avatarG}`)
            }
            const nameG = (user?.displayName)
            if (`${nameG}` !== 'null') {
                setNameG(`${nameG}`)
            } else {
                const email = (user?.email)
                setNameG(`${email}`)
            }
            const uid = (user?.uid)
            setName(`${uid}`)
        }
    })
    const handleClick = () => {
        console.log('success:nName ', nName)
        history.push('/MyPage')
    }

    const handlePass = () => {
        window.confirm("パスワードをお忘れですか。\n" + `${email}` + "へパスワード再設定のメールをお送りします。")
        var auth = firebase.auth();
        var emailAddress = `${email}`;
        auth.sendPasswordResetEmail(emailAddress).then(function () {
        }).catch(function (error) {
        })
    };
    const back = () => {
        setPro(false)
        console.log(pro)
        // history.push('/MyPage')
    }
    const clickNName = async () => {
        setNName(nyuryokuName)
        setAvatar(`${nyuryokuName}`.charAt(0))
        await
            db.collection('users').doc(name).set({
                name,
                nName: `${nyuryokuName}`,
                avatar: `${nyuryokuName}`.charAt(0),
                // avatarG,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then((docref) => {
                    console.log("Document successfully written!:");
                })
                .catch((error) => {
                    console.error("Error writing document: ");
                })
    }
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setNName(nameG)
        // await
        db.collection('users').doc(name).set({
            name,
            nName: nameG,
            // avatar: `${avatar}`,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
            .then((docref) => {
                console.log("Document successfully written!:");
            })
            .catch((error) => {
                console.error("Error writing document: ");
            })
    };

    return (
        <div className={classes.root}>
            <Typography>
                ID:{name}
            </Typography>
            <Typography>
                <TextField Required id="Required" fullWidth label="ニックネーム" value={nameG} variant="filled" />
                <FormControlLabel
                    value="start"
                    control={<Switch color="primary" checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                    label="を使う"
                    labelPlacement="start"
                />
                {state.checkedA !== true &&
                    <TextField
                        fullWidth
                        label="ニックネームを設定する"
                        Value={nyuryokuName}
                        onChange={(e) => setNyuryokuName(e.target.value)}
                    >
                    </TextField>
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    // disabled={nyuryokuName === ''}
                    onClick={clickNName}
                >
                    ニックネーム設定
                        </Button>
            </Typography>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handlePass}
            >
                パスワードの変更
                </Button>
        </div >
    );
};

export default MyPro;
