import React, { useEffect } from "react";
import {
  makeStyles,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Divider,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import history from "../../history";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { useParams } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import moment from "moment";
import { toast } from "react-toastify";

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

const RoomDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const room = useSelector((state) => state.room.room);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(roomActions.fetchRoomById(roomId));
  }, [roomId]);

  const onCopyRoomId = (roomId) => {
    return navigator.clipboard.writeText(roomId).then(() =>
      toast.info("Copied Room Id", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      }),
    );
  };

  return (
    <div className={classes.root}>
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
          <div className={classes.root} />
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography variant="body1" style={{ fontWeight: 800, color: "#333" }}>
          {room?.name}
        </Typography>
      </div>
      <Container>
        <List>
          <ListItem>
            <ListItemText primary="Room Id" secondary={room?.code} />
            <Button variant="outlined" color="primary" onClick={() => onCopyRoomId(room?.code)}>
              Copy
            </Button>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Invite Friends" />
          </ListItem>
          {authUser?._id === room?.admin._id && (
            <ListItem button onClick={() => history.push(`/chat/${roomId}/info`)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Room Info" />
            </ListItem>
          )}

          <Divider />
          {room?.admin && (
            <ListItem>
              <ListItemText
                primary="Admin"
                secondary={<Avatar alt={room?.admin.fullname} src={room?.admin.avatar_url} />}
              />
            </ListItem>
          )}

          <ListItem button>
            <ListItemText
              primary="See Group Members"
              secondary={
                <AvatarGroup max={4}>
                  {room?.users?.map((member, i) => (
                    <Avatar alt={member.fullname} src={member.avatar_url} key={i} />
                  ))}
                </AvatarGroup>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Room Created Date"
              secondary={moment(room?.createdAt).format("MMM DD, h:mm a")}
            />
          </ListItem>
          <ListItem Button onClick={() => alert("M htwt pr nk :(( ")}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Room" />
          </ListItem>
        </List>
      </Container>
    </div>
  );
};

export default RoomDetail;
