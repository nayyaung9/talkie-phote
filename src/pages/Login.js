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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: "#f9f9f9",
  },
}));

const Login = () => {
  const classes = useStyles();
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
              Login
            </Typography>
            <form>
              <TextField
                type="text"
                id="username"
                label="Username"
                margin="dense"
                variant="outlined"
                fullWidth
                size="small"
                style={{ marginBottom: 10 }}
              />

              <TextField
                type="password"
                id="password"
                label="password"
                margin="dense"
                variant="outlined"
                fullWidth
                size="small"
                style={{ marginBottom: 10 }}
              />

              <Button
                variant="outlined"
                fullWidth
                type="submit"
                style={{
                  borderWidth: 1,
                  borderColor: "#0e9f68",
                  borderStyle: "solid",
                  color: "#202627",
                  marginTop: 10,
                }}
              >
                Login
              </Button>
            </form>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
