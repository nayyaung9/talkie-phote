import React, { useEffect } from "react";
import { Avatar, Typography, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions/user.action";
import "./user.css";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const HorizontalUserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(userActions.fetchAllUsers());
  }, []);

  return (
    <div
      className="activeUser__showList"
      style={{
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        textAlign: "center",
        padding: "20px 0",
      }}>
      {users &&
        users.map((user, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              padding: "0 8px 0 8px",
            }}>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot">
              <Avatar
                alt={user.fullname}
                style={{ margin: "0 auto" }}
                src={user.avatar_url}
                key={i}
              />
            </StyledBadge>
            <Typography color="inherit" component="span" className="activeUser__name">
              {user.fullname}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default HorizontalUserList;
