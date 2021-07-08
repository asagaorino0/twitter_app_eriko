import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'
import Typography from '@material-ui/core/Typography';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';
import liff from '@line/liff';
import Grid from '@material-ui/core/Grid';

const CreateUser = () => {
    const [nameY, setNameY] = useState('');
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
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
        root: {
            gridRow: 2,
            margin: '26px',
            textAlign: 'left',
        },
    }));
    const classes = useStyles();
    // // 現在ログインしているユーザーを取得する
    // useEffect(() => {
    //     liff.getProfile()
    //         .then(profile => {
    //             setNName(profile.displayName)
    //             setName(profile.userId)
    //             setAvatar(profile.pictureUrl)
    //             myProfile()
    //         })
    // }, []
    // );
    window.onload = function (e) {
        setNName("おりのえりこ")
        setName("Ue990787da85bbd95eae9595867add9ba")
        setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
        myProfile()
        console.log(name, nName)
    }

    const myProfile = async () => {
        // await
        //     firebase
        //         .firestore()
        //         .collection("users")
        //         .where("name", "==", `${name}`)
        //         .get()
        //         .then((querySnapshot) => {
        //             querySnapshot.forEach((doc) => {
        //                 console.log(doc.id, " => ", doc.data())
        //                 setUser(doc.data())
        //             })
        //             console.log("user", `${user}`)

        //         })
        //         .catch((error) => {
        //             console.log("Error getting documents: ", error);
        //         })
        firebase
            .firestore()
            .collection("users")
            .onSnapshot((snapshot) => {
                const user = snapshot.docs
                    .filter((doc) => doc.name === `${name}`)
                    .map((doc) => {
                        return doc.id &&
                            doc.data()
                    });
                setUser(user)
                console.log(user)
            })
    }







    const reNameY = () => {
        firebase
            .firestore()
            .collection('users').doc(`${name}`).set({
                nameY: `${nameY}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        // history.push('/MyPage')
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
        // <div>
        <div className={classes.root}>
            <h2>アカウントの設定</h2>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <Grid item >
                    <Typography>
                        <img
                            src={`${avatar}`}
                            alt=""
                            style={{ borderRadius: '50%', width: '50px', height: '50px' }}
                        />
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography>
                        {`ニックネーム：${nName}`}
                    </Typography>
                    <Typography>
                        {`屋号：${user.nameY}`}
                        {`${user.insta}`.length !== 0 &&
                            <InstagramIcon alt="insta" fontSize="large" color="disabled" />
                        }
                    </Typography>
                </Grid>
            </Grid>
            {/* <Grid container direction="row" justify="flex-start" alignItems="flex-end" > */}
            <Typography container direction="row" >
                <TextField id="nameY"
                    fullWidth
                    label="屋号"
                    defaultValue={`${user.nameY} `}
                    value={nameY}
                    onChange={e => setNameY(e.target.value)}
                />
                <TextField id="insta"
                    fullWidth
                    label="insta"
                    defaultValue={`${user.insta} `}
                    value={insta}
                    onChange={e => setNameY(e.target.value)}
                />
                <Button
                    type="submit"
                    disabled={nameY === ''}
                    variant="contained"
                    color="primary"
                    className={classes.submit}

                    onClick={reNameY}
                >
                    変更</Button>
            </Typography>
            {/* </ Grid> */}
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
                    onClick={myProfile}
                >
                    更新</Button>
            </Typography>
            <Button variant="contained" onClick={user}>
                戻る
            </Button>

        </div>
    );
};
export default CreateUser;