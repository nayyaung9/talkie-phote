import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Avatar,
  Divider,
  Hidden,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import history from "../../history";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 800,
    color: "#333",
  },
  containerRoot: {
    paddingBottom: 90,
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

const JoinRoomItemList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.joinedRooms);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(roomActions.fetchUserJoinedRooms(authUser._id ? authUser._id : authUser.id));
  }, []);

  return (
    <Container className={classes.containerRoot}>
      <Grid container>
        {rooms && rooms.length <= 0 ? (
          <div
            style={{
              display: "table",
              height: "80vh",
              width: "100%",
              textAlign: "center",
            }}>
            <Typography
              style={{
                display: "table-cell",
                verticalAlign: "middle",
              }}>
              You dont have any conservation, please join room
            </Typography>
          </div>
        ) : (
          rooms &&
          rooms.map((room, i) => (
            <Grid item xs={12} sm={3} key={i}>
              <List dense component="nav" className={classes.chatItem}>
                <ListItem button onClick={() => history.push(`/chat/${room.code}`)}>
                  <ListItemText
                    primary={
                      <Typography variant="h6" gutterBottom className={classes.title}>
                        {room.name}
                      </Typography>
                    }
                    secondary={
                      <Typography color="textSecondary" component="span">
                        Members: {room.users.length}
                      </Typography>
                    }
                  />

                  <AvatarGroup max={4}>
                    {room?.users.map((member, i) => (
                      <Avatar alt={member.fullname} src={member.avatar_url} key={i} />
                    ))}
                  </AvatarGroup>
                </ListItem>
              </List>
              <Hidden smUp>
                <Divider />
              </Hidden>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default JoinRoomItemList;
