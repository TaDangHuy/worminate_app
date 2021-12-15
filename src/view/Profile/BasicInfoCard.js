import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import React from 'react'

const useStyles = makeStyles({
    container: {
        boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        boxSizing:"borderBox",
        display: 'flex',
        flexDirection: "column",
        width: "100%", height: "90px",
        borderRadius:"10px",
        padding: "25px 15px",
        backgroundColor: "white",
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
function BasicInfoCard() {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <Typography variant="h6">Basic Info</Typography>
            <Box className={classes.info}>
                <Typography variant="h6">Esthera Jackson</Typography>
                <Typography variant="subtitle1">esthera@simmmple.com</Typography>
            </Box>
        </Box>
    )
}

export default BasicInfoCard
