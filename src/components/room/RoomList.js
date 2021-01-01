import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { makeStyles, Container, Paper, Grid, Typography, Avatar, Button } from "@material-ui/core";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: 20,
    width: "100%",
    boxShadow: "0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)",
  },
  title: {
    fontWeight: 800,
    color: "#333",
  },
}));

const RoomList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);

  useEffect(() => {
    dispatch(roomActions.fetchAllRooms());
  }, []);

  return (
    <Container style={{ paddingBottom: 90 }}>
      <Typography variant="h5">Public Rooms</Typography>
      <Grid container spacing={2}>
        {rooms &&
          rooms.map((room, i) => (
            <Grid item xs={12} sm={3} key={i}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  {room.name}
                </Typography>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <AvatarGroup max={4}>
                    {room?.users.map((member, i) => (
                      <Avatar alt={member.fullname} src={member.avatar_url} key={i} />
                    ))}
                  </AvatarGroup>
                  <Button
                    variant="contained"
                    style={{
                      background: "rgb(72, 191, 131)",
                      color: "#fff",
                      border: "1px solid rgb(72, 191, 131)",
                    }}
                    onClick={() => history.push(`/chat/${room.code}`)}>
                    Join Room
                  </Button>
                </Grid>
                <Typography color="textSecondary" component="span">
                  Members: {room.users.length}
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default RoomList;
