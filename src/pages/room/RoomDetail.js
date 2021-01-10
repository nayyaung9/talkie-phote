import React from "react";
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
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import history from "../../history";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../../api";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import moment from "moment";
import { toast } from "react-toastify";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
  const { roomId } = useParams();
  const authUser = useSelector((state) => state.auth.user);

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const { status, data, error } = useQuery("roomDetail", async () => {
    const { data } = await api.get(`/api/room/${roomId}`);
    return data.data;
  });

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

  const renderRoomPrivacy = (code) => {
    switch (code) {
      case 0:
        return "Public";
      case 1:
        return "Private";
      default:
        return code;
    }
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
      {status === "loading" ? (
        <div>Loading</div>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <React.Fragment>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography variant="body1" style={{ fontWeight: 800, color: "#333" }}>
              {data?.name}
            </Typography>
          </div>
          <Container>
            <List>
              <ListItem>
                <ListItemText primary="Room Id" secondary={data?.code} />
                <Button variant="outlined" color="primary" onClick={() => onCopyRoomId(data?.code)}>
                  Copy
                </Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="Room Privacy" secondary={renderRoomPrivacy(data?.privacy)} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Invite Friends" />
              </ListItem>

              {authUser?._id === data?.admin._id && (
                <ListItem button onClick={() => history.push(`/chat/${roomId}/info`)}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Room Info" />
                </ListItem>
              )}

              <Divider />

              <ListItem button onClick={handleClick}>
                <ListItemText
                  primary={<Typography style={{ fontWeight: 800 }}>Chat Members Info</Typography>}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List>
                  {data?.admin && (
                    <ListItem>
                      <ListItemText
                        primary="Admin"
                        secondary={
                          <Avatar alt={data?.admin.fullname} src={data?.admin.avatar_url} />
                        }
                      />
                    </ListItem>
                  )}

                  <ListItem button onClick={() => history.push(`/chat/${data.code}/users`)}>
                    <ListItemText
                      primary="See Group Members"
                      secondary={
                        <AvatarGroup max={4}>
                          {data?.users?.map((member, i) => (
                            <Avatar alt={member.fullname} src={member.avatar_url} key={i} />
                          ))}
                        </AvatarGroup>
                      }
                    />
                  </ListItem>
                </List>
              </Collapse>

              <Divider />

              <ListItem>
                <ListItemText
                  primary="Room Created Date"
                  secondary={moment(data?.createdAt).format("MMM DD, h:mm a")}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default RoomDetail;
