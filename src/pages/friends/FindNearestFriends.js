import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Avatar,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions/user.action";
import { geolocationActions } from "../../store/actions/geolocation.action";
// import haversine from "haversine-distance";
import * as turf from "@turf/turf";

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

const FindNearestFriends = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.user.nearByFriends);
  const currentUserPosition = auth?.position;

  useEffect(() => {
    dispatch(userActions.fetchUserDetail(auth._id ? auth._id : auth.id));
  }, []);

  const onFindFriendsNearBy = () => {
    console.log("Find frineds");
    const payload = {
      userId: auth._id ? auth._id : auth.id,
    };
    dispatch(geolocationActions.findNearByFrineds(payload));
  };

  const mobileTabActive = {
    name: "friends",
  };

  const calculateTwoPoints = (from, to, unit) => {
    const getKilometerDistance = turf.distance(from, to, unit);
    return getKilometerDistance * 1000;
  };

  return (
    <Layout {...mobileTabActive}>
      <div>
        <button onClick={() => onFindFriendsNearBy()}>find friends nearby</button>
        <div style={{ marginTop: 40 }}>
          <List>
            <div style={{ width: "40%", margin: "0 auto" }}>Within 5000 m testing</div>
            {friends && friends.length > 0 ? (
              friends &&
              friends.map((user, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot">
                      <Avatar alt={user.fullname} src={user.avatar_url} key={i} />
                    </StyledBadge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.fullname}
                    secondary={`${calculateTwoPoints(user.position, currentUserPosition, {
                      units: "kilometers",
                    })?.toFixed(0)} m`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography variat="h6" align="center">
                No one was found near you :( FA{" "}
              </Typography>
            )}
          </List>
        </div>
      </div>
    </Layout>
  );
};

export default FindNearestFriends;
