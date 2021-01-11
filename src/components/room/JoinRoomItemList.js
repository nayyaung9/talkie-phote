/* eslint-disable react/prop-types */
import React from "react";
import {
  makeStyles,
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
import history from "../../history";

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

const JoinRoomItemList = ({ room }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={3}>
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
            {room?.users
              .slice(0)
              .reverse()
              .map((member, i) => (
                <Avatar alt={member.fullname} src={member.avatar_url} key={i} />
              ))}
          </AvatarGroup>
        </ListItem>
      </List>
      <Hidden smUp>
        <Divider />
      </Hidden>
    </Grid>
  );
};

export default JoinRoomItemList;
