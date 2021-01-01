/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../../components/Layout";
import { makeStyles, Box, Typography } from "@material-ui/core";
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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
          variant="fullWidth"
          classes={{
            indicator: classes.tabTextColor,
          }}>
          <Tab label="Rooms" />
          <Tab label="Users" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
      </Paper>
    </Layout>
  );
};

export default JoinedRoomList;
