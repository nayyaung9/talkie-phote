import React from "react";
import Layout from "../../components/Layout";
import { makeStyles, Typography, Container, Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { geolocationActions } from "../../store/actions/geolocation.action";
import { userActions } from "../../store/actions/user.action";
import { messaging } from "../../init-fcm";
import useWebApi from "../../hooks/useWebApi";

const useStyles = makeStyles((theme) => ({
  profileSrc: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    textAlign: "center",
  },
  rootRow: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const mobileTabActive = {
  name: "profile",
};

const Profile = () => {
  const { userConsent, setSuserConsent, userLocation, setUserLocation } = useWebApi();
  const dispatch = useDispatch();

  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  const isConsentGranted = userConsent === "granted";
  const isUserLocationGranted = userLocation === "granted";

  const [state, setState] = React.useState({
    location: isUserLocationGranted,
    notification: isConsentGranted,
  });

  const handleChange = () => {
    const error = () => {
      setState({ ...state, location: false });
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        const payload = {
          userId: user._id ? user._id : user.id,
          geolocation: [longitude, latitude],
        };
        dispatch(geolocationActions.getCurrentPosition(payload));

        setState({ ...state, location: true });

        return { latitude, longitude };
      }, error);
    }
  };

  const onClickAskUserPermission = () => {
    if (isConsentGranted) {
      setSuserConsent(null);
      setState({ ...state, notification: false });
    } else {
      setState({ ...state, notification: true });
    }

    messaging
      .requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        const payload = {
          userId: user?._id ? user?._id : user.id,
          deviceToken: token,
        };
        dispatch(userActions.addUserDeviceTokenForPushNotification(payload));
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  };

  return (
    <Layout {...mobileTabActive}>
      <div
        style={{
          maxWidth: "80%",
          margin: "0 auto",
          textAlign: "center",
        }}>
        <img src={user?.avatar_url} className={classes.profileSrc} alt={user?.fullname} />
        <Typography variant="body1" style={{ fontWeight: 800, color: "#333" }}>
          {user?.fullname}
        </Typography>
      </div>
      <Container>
        <div className={classes.rootRow}>
          <Typography variant="body1" style={{ fontWeight: 800, color: "#333" }}>
            Location
          </Typography>
          <Switch
            name="location"
            checked={state.location}
            onChange={handleChange}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>

        <div className={classes.rootRow}>
          <Typography variant="body1" style={{ fontWeight: 800, color: "#333" }}>
            Notification
          </Typography>
          <Switch
            name="location"
            checked={state.notification}
            onChange={onClickAskUserPermission}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Profile;
