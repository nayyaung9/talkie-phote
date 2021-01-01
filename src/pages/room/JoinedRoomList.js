import React from "react";
import Layout from "../../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const mobileTabActive = {
  name: "room",
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabTextColor: {
    backgroundColor: "rgb(72, 191, 131)",
  },
});

const JoinedRoomList = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout {...mobileTabActive}>
      {" "}
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          classes={{
            indicator: classes.tabTextColor,
          }}>
          <Tab label="Rooms" />
          <Tab label="Users" />
        </Tabs>
      </Paper>
    </Layout>
  );
};

export default JoinedRoomList;
