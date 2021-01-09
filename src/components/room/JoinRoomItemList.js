import React from "react";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Container,
  Grid,
  Typography,
  Avatar,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import JoinRoomListSkeleton from "../elements/skeleton/JoinRoomListSkeleton";
import history from "../../history";
import { useQuery } from "react-query";
import api from "../../api";

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
  const authUser = useSelector((state) => state.auth.user);

  function useFetchUserJoinedRooms() {
    return useQuery("joinedRooms", async () => {
      const res = await api.get(`/api/user/${authUser._id ? authUser._id : authUser.id}/rooms`);
      return res.data;
    });
  }

  const { status, data, error } = useFetchUserJoinedRooms();

  return (
    <Container className={classes.containerRoot}>
      <Grid container>
        {status === "loading" ? (
          <Grid item xs={12} sm={3}>
            <JoinRoomListSkeleton />
            <JoinRoomListSkeleton />
            <JoinRoomListSkeleton />
          </Grid>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          data &&
          data.data.map((room, i) => (
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
