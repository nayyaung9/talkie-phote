import React from "react";
import { Hidden } from "@material-ui/core";
import AppWrapper from "./wrapper/AppWrapper";
import MobileAppWrapper from "./wrapper/MobileAppWrapper";
import PropTypes from "prop-types"; // ES6

const Layout = ({ children, ...mobileTabActive }) => {
  return (
    <React.Fragment>
      <Hidden xsDown>
        <AppWrapper>{children}</AppWrapper>
      </Hidden>
      <Hidden smUp>
        <MobileAppWrapper mobileTabActive={mobileTabActive}>{children}</MobileAppWrapper>
      </Hidden>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  mobileTabActive: PropTypes.object,
};

export default Layout;
