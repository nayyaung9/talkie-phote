/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import {
  withStyles,
  makeStyles,
  Box,
  Badge,
  Typography,
  Grid,
  Button,
  Avatar,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { userActions } from "../../store/actions/user.action";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import history from "../../history";

const mobileTabActive = {
  name: "room",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabTextColor: {
    backgroundColor: "rgb(72, 191, 131)",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: 20,
    boxShadow: "0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12)",
  },
  title: {
    fontWeight: 800,
    color: "#333",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const PublicRoomList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const publicRooms = useSelector((state) => state.room.publicRooms);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(roomActions.fetchAllRooms());
    dispatch(userActions.fetchAllUsers());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout {...mobileTabActive}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          classes={{
            indicator: classes.tabTextColor,
          }}>
          <Tab label="Rooms" />
          <Tab label="Users" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div style={{ paddingBottom: 60 }}>
            {publicRooms &&
              publicRooms.map((room, i) => (
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
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ paddingBottom: 60 }}>
            {users &&
              users.map((user, i) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                  key={i}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot">
                    <Avatar alt={user.fullname} src={user.avatar_url} key={i} />
                  </StyledBadge>
                  <Typography color="textSecondary" component="span" style={{ paddingLeft: 8 }}>
                    {user.fullname}
                  </Typography>
                </div>
              ))}
          </div>
        </TabPanel>
      </Paper>
    </Layout>
  );
};

export default PublicRoomList;
