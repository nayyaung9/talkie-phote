import React from "react";
import AuthHeader from "../components/header/AuthHeader";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import FacebookLogin from "react-facebook-login";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: "#f9f9f9",
  },
}));

const Login = () => {
  const classes = useStyles();

  const responseFacebook = (response) => {
    console.log(response);
  }

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
        <Paper style={{ margin: 20, boxShadow: "none" }}>
          <div className={classes.root}>
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
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
