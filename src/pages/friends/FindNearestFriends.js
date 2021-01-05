import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Avatar, Typography, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions/user.action";
import { geolocationActions } from "../../store/actions/geolocation.action";

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

  return (
    <Layout {...mobileTabActive}>
      <div>
        <button onClick={() => onFindFriendsNearBy()}>find friends nearby</button>
        <Container style={{ marginTop: 40 }}>
          {friends &&
            friends.map((user, i) => (
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
        </Container>
      </div>
    </Layout>
  );
};

export default FindNearestFriends;
