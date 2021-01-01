import React from "react";
import Layout from "../../components/Layout";
import { makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  profileSrc: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    textAlign: "center",
  },
}));

const mobileTabActive = {
  name: "profile",
};

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
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
    </Layout>
  );
};

export default Profile;
