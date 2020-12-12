import React from "react";
import AuthHeader from "../components/header/AuthHeader";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { authActions } from "../store/actions/auth.action";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: "#f9f9f9",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const responseFacebook = (response) => {
    const {
      name,
      email,
      picture: { data },
    } = response;
    const payload = {
      fullname: name,
      email,
      avatar_url: data?.url,
    };
    dispatch(authActions.authenticate(payload));
  };

  // console.log(process.env.REACT_APP_FACEBOOK_APPID);

  return (
    <div>
      <AuthHeader />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Paper style={{ margin: 20, boxShadow: "none", textAlign: "center" }}>
          <div className={classes.root}>
            <div style={{ marginBottom: 20 }}>
              <Typography
                variant="h5"
                color="textSecondary"
                align="center"
                gutterBottom
              >
                Talkie Phote Kya Mel
              </Typography>
              <FacebookLogin
                appId="188832119556873"
                fields="name,email,picture"
                size="small"
                callback={responseFacebook}
              />
            </div>
            <Divider />
            <div style={{ marginTop: 20, width: 350 }}>
              <Typography varaint="subtitle2" color="textSecondary">
                Please don't provide any information, like passwords and other
                personal information.
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
