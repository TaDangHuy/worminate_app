import {
  Alert,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Snackbar,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import SnackbarCustom from "../../../components/SnackbarCustom";

export default function SimpleDialog(props) {
  const history = useHistory();
  const { onClose, open, data, removeFollowingByID } = props;

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarprops, setSnackbarProps] = useState(null);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (userId) => {
    history.push(`/profile/${userId}`);
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        titleStyle={{ textAlign: "center" }}
      >
        <DialogTitle>Following users</DialogTitle>
        <DialogContent>
          {data.length ? (
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {data.map((user, index) => (
                <>
                  <ListItem
                    alignItems="center"
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="add"
                        onClick={() => {
                          axios
                            .delete("/user/followers", {
                              data: { userId: user["_id"] },
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            })
                            .then((res) => {
                              setSnackbarProps({
                                severity: "success",
                                message: "Unfollowed successfully",
                              });
                              setOpenSnackbar(true);
                              removeFollowingByID(user["_id"]);
                            });
                        }}
                      >
                        <PersonRemoveIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      onClick={() => handleListItemClick(user["_id"])}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={user.image.path}
                          sx={{ width: 56, height: 56 }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={user.fullName} sx={{ ml: 2 }} />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          ) : (
            <ListItemText primary={<h1>Nothing to show</h1>} />
          )}
        </DialogContent>
      </Dialog>
      <SnackbarCustom
        openSnackbarProp={openSnackbar}
        setOpenSnackbarProp={(value) => {
          setOpenSnackbar(value);
        }}
        snackbarprops={snackbarprops}
      />
    </>
  );
}
