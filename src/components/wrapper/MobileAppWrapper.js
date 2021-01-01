import React from "react";
import {
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types"; // ES6
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  mobileAppBar: {
    top: "auto",
    bottom: 0,
    background: "#fff",
    color: "#000",
    boxShadow: "0 7px 25px 2px rgba(0,0,0,.17), 0 10px 80px 5px rgba(0,0,0,.17)",
  },
  appBar: {
    background: "#fff",
    color: "#000",
    boxShadow: "none",
  },
  profileSrc: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 800,
    color: "#333",
  },
  iconButton: {
    display: "flex",
    flexDirection: "column",
  },
}));

const MobileAppWrapper = ({ children, mobileTabActive }) => {
  const classes = useStyles();
  const authUser = useSelector((state) => state.auth?.user);
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Avatar alt="Remy Sharp" src={authUser.avatar_url} className={classes.profileSrc} />

          <Typography variant="h6" className={classes.title}>
            Talkie Phote
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      {children}
      <AppBar position="fixed" color="primary" className={classes.mobileAppBar}>
        <Toolbar>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <IconButton
              edge="start"
              classes={{ label: classes.iconButton }}
              style={{
                color: mobileTabActive?.name === "chat" ? "rgb(72, 191, 131)" : "#ddd",
              }}>
              <ChatBubbleRoundedIcon />
              <Typography variant="body1">Chats</Typography>
            </IconButton>
            <IconButton edge="start" classes={{ label: classes.iconButton }}>
              <MeetingRoomIcon />
              <Typography variant="body1">Rooms</Typography>
            </IconButton>
            <IconButton edge="start" classes={{ label: classes.iconButton }}>
              <AccountCircleIcon />
              <Typography variant="body1">Profile</Typography>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

MobileAppWrapper.propTypes = {
  children: PropTypes.node,
  mobileTabActive: PropTypes.object,
};

export default MobileAppWrapper;
