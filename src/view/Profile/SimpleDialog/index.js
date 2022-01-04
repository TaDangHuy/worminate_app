import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export default function SimpleDialog(props) {
  const { onClose, open, data } = props;
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Following user</DialogTitle>
      {data ? (
        <List sx={{ pt: 0, width: 300 }}>
          {data.map((element, index) => (
            <ListItem
              button
              onClick={() => handleListItemClick(element.fullName)}
              key={index}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={element.image.path}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={element.fullName}
                secondary={element.email}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <h1>Danh sách đang còn trống</h1>
      )}
    </Dialog>
  );
}
