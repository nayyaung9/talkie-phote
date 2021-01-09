import React from "react";
import { Avatar, Typography, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import useFetchUserList from "../../hooks/useFetchUserList";
import HorizontalUserSkeleton from "../../components/elements/skeleton/HorizontalUserSkeleton";
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
  const { status, data, error } = useFetchUserList({ limit: 20 });

  console.log("data", data);
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
      {" "}
      {status === "loading" ? (
        <>
          <HorizontalUserSkeleton />
          <HorizontalUserSkeleton />
          <HorizontalUserSkeleton />
        </>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        data &&
        data.data.map((user, i) => (
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
        ))
      )}
    </div>
  );
};

export default HorizontalUserList;
