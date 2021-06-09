import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../config/firebase'

const CreateUser = () => {
    const [nameG, setNameG] = useState<string>('');
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const history = useHistory()
    const handleClick = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('success login')
                var user = userCredential.user;
                const name = (user?.email)
                setNameG(`${nameG}`)
                history.push('/Main')
                var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
                    email, window.location.href);
                firebase.auth().currentUser?.reauthenticateWithCredential(credential)
                    .then((usercred) => {
                    })
                    .catch((error) => {
                    });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                setError(errorMessage)
            });
    }
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setError('')
            setNameG('')
            setEmail('')
            setPassword('')
            history.push('/')
            console.log(nameG.length)
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }
    return (
        <div>
            <h2>CreateUser</h2>
            <TextField id="email" label="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <TextField id="password" label="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <Button variant="outlined" onClick={handleClick}>Create</Button>
            <Button variant="contained" onClick={signOut}>
                戻る
            </Button>
            {error.length !== 0 && (
                <h6>{`${error}`}</h6>
            )}
        </div>
    );
};
export default CreateUser;