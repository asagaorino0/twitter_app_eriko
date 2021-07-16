import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app";
import Typography from '@material-ui/core/Typography';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';
import liff from '@line/liff';
import Grid from '@material-ui/core/Grid';
import RefreshIcon from '@material-ui/icons/Refresh'

const CreateUser = () => {
    const [nameY, setNameY] = useState('');
    const [namae, setNamae] = useState('');
    const [name, setName] = useState('');
    const [nName, setNName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [user, setUser] = useState([]);
    const [insta, setInsta] = useState('');
    const [bunno1, setBunno1] = useState('');
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
    // useEffect(() => {
    //     setNName("おりのえりこ")
    //     setName("Ue990787da85bbd95eae9595867add9ba")
    //     setAvatar("https://profile.line-scdn.net/0hjPIS5uTyNX90KhnFiBdKKEhvOxIDBDM3DEt-EQV_Pk5YH3F9S0QtHlMrO0cOEnYvSU55TlR9OE4M")
    //     myProfile()
    //     // console.log(name, nName)
    // }, []
    // );

    const myProfile = async () => {
        await
            firebase
                .firestore()
                .collection("users")
                .where("name", "==", `${name}`)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data())
                        setUser(doc.data())
                    })
                })
    }
    const myPage = () => {
        history.push('/Main')
    }
    const reNameY = () => {
        firebase
            .firestore()
            .collection('users').doc(`${name}`).set({
                nameY: `${nameY}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        myProfile()
    }
    const reNamae = () => {
        firebase
            .firestore()
            .collection('users').doc(`${name}`).set({
                namae: `${namae}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        myProfile()
    }
    const reInsta = () => {
        firebase
            .firestore()
            .collection('users').doc(`${name}`).set({
                insta: `${insta}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        myProfile()
    }
    const reBunno1 = () => {
        firebase
            .firestore()
            .collection('users').doc(`${name}`).set({
                bunno1: `${bunno1}`,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true }//←上書きされないおまじない
            )
        myProfile()
    }

    return (
        // <div>
        <div className={classes.root}>
            {/* <h2>アカウントの設定</h2> */}
            <Grid container direction="row" justify="flex-start" alignItems="flex-top" >
                <Grid item >
                    <Typography>
                        <img
                            src={`${avatar}`}
                            alt=""
                            style={{ borderRadius: '50%', width: '50px', height: '50px' }}
                        />
                    </Typography>
                    <Grid item >
                        <RefreshIcon onClick={myProfile} />
                    </Grid>
                </Grid>
                <Grid item >
                    <Typography>
                        {`username：${nName}`}
                    </Typography>
                    <Typography>
                        {`${user.nameY}`.length !== 0 &&
                            `屋号：${user.nameY}`
                        }
                    </Typography>
                    <Typography>
                        {`${user.insta}` !== "" &&
                            <a
                                href={user.insta}
                                underline="none"
                                target="_blank"
                            >
                                <InstagramIcon alt="insta" />
                                {user.insta}
                            </a>
                        }
                    </Typography>
                    <Typography>
                        {`氏名：${user.namae}`}
                    </Typography>
                    <Typography>
                        {`${user.bunno1}`}
                    </Typography>
                </Grid>
            </Grid>



            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <Typography container direction="row" >
                    <TextField required id="standard-required"
                        // fullWidth
                        label="屋号"
                        defaultValue={`${user.nameY} `}
                        value={nameY}
                        onChange={e => setNameY(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={nameY === ''}
                        // variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={reNameY}
                    >
                        変更</Button>
                </Typography>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <Typography container direction="row" >
                    <TextField required id="standard-required"
                        // fullWidth
                        label="氏名（非公開）"
                        defaultValue={`${user.namae} `}
                        value={namae}
                        onChange={e => setNamae(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={namae === ''}
                        // variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={reNamae}
                    >
                        変更</Button>
                </Typography>
            </Grid>

            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <Typography container direction="row" >
                    <TextField required id="standard-required"
                        // fullWidth
                        label="insta"
                        defaultValue={`${user.insta} `}
                        value={insta}
                        onChange={e => setInsta(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={insta === ''}
                        // variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={reInsta}
                    >
                        変更</Button>
                </Typography>
            </Grid>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <Typography container direction="row" >
                    <TextField required id="standard-required"
                        // fullWidth
                        label="100万分の1の私とか．．"
                        defaultValue={`${user.bunno1} `}
                        value={bunno1}
                        onChange={e => setBunno1(e.target.value)}
                    />
                    <Button
                        type="submit"
                        disabled={bunno1 === ''}
                        // variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={reBunno1}
                    >
                        変更</Button>
                </Typography>
            </Grid>


            <Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={myProfile}
                >
                    更新</Button>
            </Typography>
            <Button variant="contained" onClick={myPage}>
                戻る
            </Button>

        </div>
    );
};
export default CreateUser;