import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PublishIcon from "@mui/icons-material/Publish";
import axios from "axios";
import { BiDollar } from "react-icons/bi";
import { Box } from "@mui/lab/node_modules/@mui/system";

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("1st Month Management Cost", 100, 300, 500),
  createData("Following Month", 300, 700, 900),
  createData("Delivery Time frame", 1, 3, 5),
  createData("Certificate", "No", "Yes", "Yes"),
];

function PostCard({
  post,
  id,
  type,
  setRecentPostsProp,
  setSoldPostsProp,
  setPostsProp,
}) {
  const [openPromotionDialog, setOpenPromotionDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  return (
    <>
      <Card sx={{ maxWidth: 270 }}>
        <a
          href={`/posts/${post["_id"]}`}
          style={{
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "#f5f8fb",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 270, height: 140 }}
            image={post.images.length > 0 ? post.images[0].path : ""}
            alt="post image"
          />
          <CardContent sx={{ height: 114 }}>
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight="700"
              >
                {`Post #${id + 1}`}
              </Typography>
              <Box>
                <BiDollar
                  size={23}
                  color="#3b8767"
                  style={{ margin: "0px -3px 6.5px -4px" }}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    display: "inline",
                    maxWidth: "30px",
                  }}
                  variant="subtitle1"
                  color="primary"
                  noWrap
                >
                  {post.price
                    ? `${Math.round(post.price)}`
                    : post.price === 0
                    ? "0"
                    : "?"}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="h6" color="textPrimary" noWrap>
              {post.title}
            </Typography>

            <Typography
              variant="subtitle1"
              paragraph
              color="text.secondary"
              noWrap
            >
              {post.description}
            </Typography>
          </CardContent>
        </a>
        <CardActions>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="space-between"
          >
            {/* <IconButton
              color="secondary"
              variant="outlined"
              component={Link}
              to={`/posts/${post["_id"]}`}
              sx={{
                "&:hover": { backgroundColor: "#f5f8fb" },
              }}
            >
              <RemoveRedEyeIcon />
            </IconButton> */}
            {/* <IconButton
              color="secondary"
              variant="outlined"
              component={Link}
              // to={`/posts/${post["_id"]}`}
              sx={{
                "&:hover": { backgroundColor: "#f5f8fb" },
              }}
            >
              <PublishIcon />
            </IconButton> */}
            {type === "recent" && (
              <Button
                color="primary"
                // variant="outlined"
                sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                onClick={() => {
                  axios({
                    method: "POST",
                    url: `/posts/${post["_id"]}/sale`,
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    data: {
                      sale: "false",
                    },
                  })
                    .then((res) => {
                      setRecentPostsProp((oldRecent) => [
                        ...oldRecent.filter((e) => e !== post),
                      ]);
                      setSoldPostsProp((oldSold) => [...oldSold, post]);
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Sold
              </Button>
            )}
            {type === "recent" && (
              <Button
                color="primary"
                // variant="outlined"
                sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                DELETE
              </Button>
            )}
            {type === "sold" && (
              <Button
                color="primary"
                // variant="outlined"
                sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
                onClick={() => {
                  axios({
                    method: "POST",
                    url: `/posts/${post["_id"]}/sale`,
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    data: {
                      sale: "true",
                    },
                  })
                    .then((res) => {
                      setSoldPostsProp((oldSold) => [
                        ...oldSold.filter((e) => e !== post),
                      ]);
                      setRecentPostsProp((oldRecent) => [...oldRecent, post]);
                    })
                    .catch((err) => console.log(err));
                }}
              >
                For sale
              </Button>
            )}
            {type === "sold" && (
              <Button
                onClick={() => setOpenPromotionDialog(true)}
                color="primary"
                sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
              >
                Push
              </Button>
            )}
            {type !== "favorite" && (
              <IconButton
                color="secondary"
                variant="outlined"
                component={Link}
                to={`/posts/${post["_id"]}/edit`}
                sx={{ "&:hover": { backgroundColor: "#f5f8fb" } }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Stack>
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you delete it you will not be able to recover the post!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button
            onClick={() => {
              setOpenBackdrop(true);
              axios({
                method: "DELETE",
                url: `/posts/${post["_id"]}`,
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => {
                  setPostsProp((oldPosts) => [
                    ...oldPosts.filter((e) => e !== post),
                  ]);
                  setOpenBackdrop(false);
                })
                .catch((err) => {
                  alert(err);
                  setOpenBackdrop(false);
                });
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openPromotionDialog}
        onClose={() => setOpenPromotionDialog(false)}
        aria-labelledby="alert-promotion-title"
        aria-describedby="alert-promotion-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-promotion-title">
          <Typography align="center">Promotion Plans</Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>COMPARE ALL PLANS</TableCell>
                  <TableCell align="center">BASIC</TableCell>
                  <TableCell align="center">PLUS</TableCell>
                  <TableCell align="center">VISIONARY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                  </TableRow>
                ))}
                <TableRow
                  key="action"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {""}
                  </TableCell>
                  <TableCell align="center">
                    <Button>Buy</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button>Buy</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button>Buy</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default PostCard;
