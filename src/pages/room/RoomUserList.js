import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import history from "../../history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useQuery } from "react-query";
import api from "../../api";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: "#fff",
    color: "#000",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const RoomUserList = () => {
  const classes = useStyles();
  const { roomId } = useParams();

  const { status, data, error } = useQuery("roomDetailUser", async () => {
    const res = await api.get(`/api/room/${roomId}`);
    return res.data;
  });

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography>Chat Members</Typography>
          <div className={classes.root} />
        </Toolbar>
      </AppBar>
      {status === "loading" ? (
        <div>Loading</div>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <List>
          {data &&
            data?.data?.users.map((user, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  <Avatar src={user?.avatar_url} alt={user?.fullname} />
                </ListItemIcon>
                <ListItemText primary={user?.fullname} />
              </ListItem>
            ))}
        </List>
      )}
    </div>
  );
};

export default RoomUserList;
