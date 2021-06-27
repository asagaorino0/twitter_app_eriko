import firebase from "firebase";
import "firebase/auth";
const Verify = async (req, res) => {
    // id tokenを取得
    const idToken = req.body.idToken;

    // id tokenの有効性を検証する
    const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: stringify({
            id_token: idToken,
            client_id: process.env.LIFF_CHANNEL_ID,
        }),
    });
    const data = await response.json();
    if (response.status !== 200) {
        // IDトークンが有効ではない場合
        res.status(400).send(data.error);
        return;
    }


    // // LINE IDでfirebaseトークンを発行して返却
    // const token = await auth.createCustomToken(data.sub);
    // // const token = await firebase.auth().createCustomToken(data.sub);
    // res.status(200).send(token);
};