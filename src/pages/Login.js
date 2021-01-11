import React from "react";
import AuthHeader from "../components/header/AuthHeader";
import { makeStyles, Paper, Grid, Typography, Divider, CircularProgress } from "@material-ui/core";
import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/actions/auth.action";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: "#f9f9f9",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loading = useSelector((state) => state.loading.loading);
  const isAuth = useSelector((state) => state.auth.isAuth);

  React.useEffect(() => {
    if (isAuth) {
      history.push("/chat");
    }
  }, [isAuth]);
  const responseFacebook = (response) => {
    const {
      name,
      email,
      userID,
      picture: { data },
    } = response;

    const payload = {
      fullname: name,
      email: email ? email : userID,
      avatar_url: data?.url,
    };
    dispatch(authActions.authenticate(payload));
  };

  const errorOnLogin = (e) => {
    console.log("error", e);
  };

  return (
    <div>
      <AuthHeader />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}>
        <Paper style={{ margin: 20, boxShadow: "none", textAlign: "center" }}>
          {!loading ? (
            <div className={classes.root}>
              <div style={{ marginBottom: 20 }}>
                <Typography variant="h5" color="textSecondary" align="center" gutterBottom>
                  Talkie Phote Kya Mel
                </Typography>

                <FacebookLogin
                  appId="188832119556873"
                  fields="name,email,picture.type(large)"
                  scope="public_profile"
                  size="small"
                  disableMobileRedirect={true}
                  callback={responseFacebook}
                  onFailure={errorOnLogin}
                />
              </div>
              <Divider />
              <div style={{ marginTop: 20, width: 350 }}>
                <Typography varaint="subtitle2" color="textSecondary">
                  Please do not provide any information, like passwords and other personal
                  information.
                </Typography>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <CircularProgress />
              <Typography style={{ paddingTop: 10 }}>
                Please wait your request is being processed
              </Typography>
            </React.Fragment>
          )}
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
