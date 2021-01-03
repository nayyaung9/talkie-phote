import React from "react";
import { makeStyles, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types"; // ES6
import history from "../history";

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

const ChatDetailWrapper = (props) => {
  const { roomName, children, roomId } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push(`/chat/${roomId}/setting`)}>
            {roomName}
          </Typography>

          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={() => history.push(`/chat/${roomId}/setting`)}>
            <ErrorIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
    </div>
  );
};

ChatDetailWrapper.propTypes = {
  roomName: PropTypes.string,
  children: PropTypes.node,
  roomId: PropTypes.string,
};

export default ChatDetailWrapper;
