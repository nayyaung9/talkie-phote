import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types"; // ES6

const AdminRoute = ({ children, ...remainingProps }) => {
  const auth = useSelector((state) => state.auth.isAuth);

  let childrenWithRemaingProps = React.cloneElement(children, {
    remaingProps: remainingProps,
  });

  const renderRoute = (properties) => {
    if (auth) {
      return childrenWithRemaingProps;
    } else {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: properties.location },
          }}
        />
      );
    }
  };

  return <Route {...remainingProps} render={(props) => renderRoute(props)} />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
