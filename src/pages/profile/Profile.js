import React from "react";
import Layout from "../../components/Layout";
import { makeStyles, Typography, Container, Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { geolocationActions } from "../../store/actions/geolocation.action";
import usePushNotifications from "../../hooks/usePushNotifications";

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
  const dispatch = useDispatch();
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications();

  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  const isConsentGranted = userConsent === "granted";

  const [state, setState] = React.useState({
    location: false,
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
            checked={state.location}
            onChange={onClickAskUserPermission}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>

        <button
          disabled={!pushNotificationSupported || !isConsentGranted || userSubscription}
          onClick={onClickSusbribeToPushNotification}>
          {userSubscription ? "Push subscription created" : "Create Notification subscription"}
        </button>

        <button
          disabled={!userSubscription || pushServerSubscriptionId}
          onClick={onClickSendSubscriptionToPushServer}>
          {pushServerSubscriptionId
            ? "Subscrption sent to the server"
            : "Send subscription to push server"}
        </button>

        {pushServerSubscriptionId && (
          <div>
            <p>The server accepted the push subscrption!</p>
            <button onClick={onClickSendNotification}>Send a notification</button>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Profile;
