import React from "react";
import { makeStyles, Paper, Grid, Typography } from "@material-ui/core";

import RoomList from "../components/room/RoomList";
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
  const classes = useStyles();

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
              </div>
            </div>
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
