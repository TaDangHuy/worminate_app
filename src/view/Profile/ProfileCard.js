import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React from 'react'

const useStyles = makeStyles({
    container: {
        boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        width: "100%", height: "90px",
        padding: "10px 15px",
        marginBottom: "15px",
        backgroundColor: "white",
        borderRadius: "10px"
    },
    avatar: {
        width: "80px",
        height: "90px",
        marginRight: "15px",
        borderRadius: "20px",
        overflow: "hidden",
        "& img" : {
            width: "100%",
            height:"100%"
        }
    },
    info: {

    }
})
function ProfileCard() {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Box className={classes.avatar}>
                <img src="https://bigdata-vn.com/wp-content/uploads/2021/10/1634541563_173_Hinh-anh-ngau-dep-nhat-lam-avatar-Facebook-Zalo.jpg" alt="avatar"/>
            </Box>
            <Box className={classes.info}>
                <Typography variant="h6">Esthera Jackson</Typography>
                <Typography variant="subtitle1">esthera@simmmple.com</Typography>
            </Box>
        </Box>
    )
}

export default ProfileCard
