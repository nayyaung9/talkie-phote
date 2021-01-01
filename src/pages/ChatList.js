import React, { useState } from "react";
import { makeStyles, Paper, Grid, Button, Typography } from "@material-ui/core";
import JoinDialog from "../components/dialog/JoinDialog";
import CreateDialog from "../components/dialog/CreateDialog";
import RoomList from "../components/room/RoomList";
import { roomActions } from "../store/actions/room.action";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";

const useStyles = makeStyles(() => ({
  paper: {
    boxShadow: "none",
  },
  joinButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgb(72, 191, 131)",
    borderStyle: "solid",
    color: "rgb(72, 191, 131)",
    paddingTop: "6px",
    borderRight: "20px",
    paddingBottom: "6px",
    borderLeft: "20px",
    width: "100%",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "rgb(72, 191, 131)",
      color: "white",
    },
  },
  createButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgb(72, 191, 131)",
    borderStyle: "solid",
    color: "#fff",
    backgroundColor: "rgb(72, 191, 131)",
    paddingTop: "6px",
    borderRight: "20px",
    paddingBottom: "6px",
    borderLeft: "20px",
    width: "100%",
    marginRight: 8,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "rgb(72, 191, 131)",
      color: "white",
    },
  },
}));

const ChatList = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);

  const classes = useStyles();
  const [joinDialog, setJoinDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);

  const openJoinDialog = () => {
    setJoinDialog(true);
  };

  const closeJoinDialog = () => {
    setJoinDialog(false);
  };

  const joinRoomById = (roomId) => {
    setJoinDialog(false);
    const payload = {
      roomId,
      user: auth._id ? auth._id : auth.id,
    };
    dispatch(roomActions.joinRoom(payload));
  };

  const openCreateDialog = () => {
    setCreateDialog(true);
  };

  const closeCreateDialog = () => {
    setCreateDialog(false);
  };

  const mobileTabActive = {
    name: "chat",
  };

  return (
    <Layout {...mobileTabActive}>
      <Paper className={classes.paper}>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Paper style={{ margin: 20, boxShadow: "none", textAlign: "center" }}>
            <div className={classes.root}>
              <div style={{ marginBottom: 20 }}>
                <Typography variant="h5" color="textSecondary" align="center" gutterBottom>
                  Talkie Phote Kya Mal, Room Join Lite
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Button className={classes.createButton} onClick={openCreateDialog}>
                      Create a room
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button className={classes.joinButton} onClick={openJoinDialog}>
                      Join a room
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>

            <JoinDialog
              joinDialog={joinDialog}
              closeJoinDialog={closeJoinDialog}
              joinRoomById={joinRoomById}
            />
            <CreateDialog createDialog={createDialog} closeCreateDialog={closeCreateDialog} />
          </Paper>
        </Grid>
        <Paper className={classes.paper}>
          <RoomList />
        </Paper>
      </Paper>
    </Layout>
  );
};

export default ChatList;
