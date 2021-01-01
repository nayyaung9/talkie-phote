import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

import RoomList from "../components/room/RoomList";
import Layout from "../components/Layout";

const useStyles = makeStyles(() => ({
  paper: {
    boxShadow: "none",
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
        <RoomList />
      </Paper>
    </Layout>
  );
};

export default ChatList;
