
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimplePaper({ followers }) {
    const [anchorFl, setAnchorFl] = React.useState(null);
    const handleFollower = (event) => {
        setAnchorFl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorFl(null);
    };

    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                <img src={followers.follower} alt="" style={{ borderRadius: '50%', width: '30px', height: '30px' }} onClick={handleFollower} />
            </Grid>
            <Menu
                id="simple-menu"
                anchorEl={anchorFl}
                keepMounted
                open={Boolean(anchorFl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <img src={`${followers.follower}`} alt="" style={{ borderRadius: '50%', width: '80px', height: '80px' }} />
                </MenuItem>
                <MenuItem onClick={handleClose}>{`${followers.followerName}`}</MenuItem>
            </Menu>
        </div>
    )
}
