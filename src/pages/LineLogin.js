import React from 'react'
import Button from '@material-ui/core/Button';

const Line_Login = () => {
    // GET https://api.line.me/friendship/v1/status
    // POST https://api.line.me/v2/oauth/accessToken

    const LineClick = () => {
        'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1656149559&redirect_uri=https://line-login-twitter-app-eriko.herokuapp.com/auth&state=12345abcde&scope=profile%20openid&nonce=09876xyz';
    }
    return (
        <div>
            <Button
                variant="contained"
                fullWidth
                onClick={LineClick}
                color="primary"
            >
                lineでLogin
                         </Button>
            <h1>line</h1>
        </div>
    )
}

export default Line_Login;