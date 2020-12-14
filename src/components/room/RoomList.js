import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { Link } from "react-router-dom";
import { Container, Grid, Typography } from "@material-ui/core";

const RoomList = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms);

  useEffect(() => {
    dispatch(roomActions.fetchAllRooms());
  }, []);

  return (
    <div>
      <Container>
        <Typography variant="h5">Public Rooms</Typography>
        <Grid container spacing={2}>
          {rooms &&
            rooms.map((room, i) => (
              <Grid item xs={12} sm={3} key={i}>
                <Typography gutterBottom>
                  <Link to={`/chat/${room.code}`}>{room.name}</Link>
                </Typography>
                <Typography color="textSecondary" component="span">
                  Members: {room.users.length}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default RoomList;
