import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import liff from '@line/liff';

const CreateUser = () => {
    const [nameY, setNameY] = useState('');
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [user, setUser] = useState('');
    const [insta, setInsta] = useState('');
    const [mokuhyo3, setMokuhyo3] = useState('');
    const [mokuhyo2, setMokuhyo2] = useState('');
    const [mokuhyo1, setMokuhyo1] = useState('');
    const [nensyo3, setNensyo3] = useState('');
    const [nensyo2, setNensyo2] = useState('');
    const [nensyo1, setNensyo1] = useState('');
    const history = useHistory()

    const useStyles = makeStyles((theme) => ({
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));
    const classes = useStyles();
    // 現在ログインしているユーザーを取得する
    useEffect(() => {
        liff.getProfile()
            .then(profile => {
                setNName(profile.displayName)
                setName(profile.userId)
                setAvatar(profile.pictureUrl)
                myProfile()
            })
    }, []
    );
    const myProfile = async () => {
        await
            firebase
                .firestore()
                .collection("users")
                .doc(`${name}`)
                .onSnapshot((snapshot) => {
                    const user = snapshot.docs.map((doc) => {
                        return doc.id &&
                            doc.data()
                    });
                    setUser(user)
                    console.log(user)
                })

    }


    const handleClick = () => {
        firebase
            .firestore()
            .collection('users').doc(`${name}`).set({
                nameY: `${nameY}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        // history.push('/MyPage')

    }

    return (
        <div>
            <h2>アカウントの設定</h2>
            <Typography>
                {/* <TextField id="nameY" fullWidth label="屋号" value={yago} onChange={e => setNameY(e.target.value)} /> */}
            </Typography>
            <Typography>
                <TextField id="nameY" fullWidth label="屋号" value={nameY} onChange={e => setNameY(e.target.value)} />
            </Typography>
            <Typography>
                {/* <TextField id="password" fullWidth label="password" value={password} onChange={e => setPassword(e.target.value)} /> */}
            </Typography>
            <Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    // disabled={password === ''}
                    onClick={handleClick}
                >
                    更新</Button>
            </Typography>
            <Button variant="contained">
                戻る
            </Button>

        </div>
    );
};
export default CreateUser;