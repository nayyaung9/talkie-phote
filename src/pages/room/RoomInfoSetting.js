import React from "react";
import {
  makeStyles,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import history from "../../history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useRoomHook from "../../hooks/useRoomHook";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

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

const RoomInfoSetting = () => {
  const classes = useStyles();
  const { roomId } = useParams();
  // const { status, data, error } = useRoomHook(roomId);

  const { status, data, error } = useQuery("todos", () => fetch(`/api/room/${roomId}`), {
    roomName: "",
  });

  console.log("data", data);
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
          <Typography>Edit Room Info</Typography>
          <div className={classes.root} />
        </Toolbar>
      </AppBar>
      <Container>
        {status === "loading" ? (
          <div>Loading</div>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <div>
            <TextField value={data.name} variant="outlined" size="small" fullWidth />
          </div>
        )}
      </Container>
    </div>
  );
};

export default RoomInfoSetting;
