import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
} from "@material-ui/core";
import JoinDialog from "../dialog/JoinDialog";
import CreateDialog from "../dialog/CreateDialog";
import ChatBubbleRoundedIcon from "@material-ui/icons/ChatBubbleRounded";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import NearMeIcon from "@material-ui/icons/NearMe";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PropTypes from "prop-types"; // ES6
import { useSelector, useDispatch } from "react-redux";
import history from "../../history";
import { roomActions } from "../../store/actions/room.action";

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
  headerIconButton: {
    background: "#e4e6eb !important",
    marginLeft: theme.spacing(1),
  },
}));

const MobileAppWrapper = ({ children, mobileTabActive }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth?.user);

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

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Avatar alt="Remy Sharp" src="/assets/image/appLogo.png" className={classes.profileSrc} />

          <Typography variant="h6" className={classes.title}>
            Talkie Phote
          </Typography>
          <IconButton edge="start" className={classes.headerIconButton} onClick={openJoinDialog}>
            <NearMeIcon />
          </IconButton>
          <IconButton edge="start" className={classes.headerIconButton} onClick={openCreateDialog}>
            <GroupAddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <JoinDialog
        joinDialog={joinDialog}
        closeJoinDialog={closeJoinDialog}
        joinRoomById={joinRoomById}
      />
      <CreateDialog createDialog={createDialog} closeCreateDialog={closeCreateDialog} />

      <Toolbar />
      {children}
      <AppBar position="fixed" color="primary" className={classes.mobileAppBar}>
        <Toolbar>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <IconButton
              edge="start"
              classes={{ label: classes.iconButton }}
              onClick={() => history.push("/chat")}
              style={{
                color:
                  mobileTabActive?.name === "chat" ? "rgb(72, 191, 131)" : "rgba(0, 0, 0, 0.54)",
              }}>
              <ChatBubbleRoundedIcon />
              <Typography variant="body1">Chats</Typography>
            </IconButton>
            <IconButton
              edge="start"
              classes={{ label: classes.iconButton }}
              onClick={() => history.push("/rooms")}
              style={{
                color:
                  mobileTabActive?.name === "room" ? "rgb(72, 191, 131)" : "rgba(0, 0, 0, 0.54)",
              }}>
              <MeetingRoomIcon />
              <Typography variant="body1">Rooms</Typography>
            </IconButton>

            <IconButton
              edge="start"
              classes={{ label: classes.iconButton }}
              onClick={() => history.push("/friends")}
              style={{
                color:
                  mobileTabActive?.name === "friends" ? "rgb(72, 191, 131)" : "rgba(0, 0, 0, 0.54)",
              }}>
              <EmojiPeopleIcon />
              <Typography variant="body1">Friends</Typography>
            </IconButton>
            <IconButton
              edge="start"
              classes={{ label: classes.iconButton }}
              onClick={() => history.push("/me")}
              style={{
                color:
                  mobileTabActive?.name === "profile" ? "rgb(72, 191, 131)" : "rgba(0, 0, 0, 0.54)",
              }}>
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
