/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles, Container, Grid } from "@material-ui/core";
import Layout from "../../components/Layout";
import HorizontalUserList from "../../components/user/HorizontalUserList";
import JoinRoomItemList from "../../components/room/JoinRoomItemList";
import JoinRoomListSkeleton from "../../components/elements/skeleton/JoinRoomListSkeleton";
import HorizontalUserSkeleton from "../../components/elements/skeleton/HorizontalUserSkeleton";

import { useQuery } from "react-query";
import api from "../../api";
import { useSelector } from "react-redux";

const mobileTabActive = {
  name: "chat",
};

const useStyles = makeStyles((theme) => ({
  containerRoot: {
    paddingBottom: 90,
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

const JoinedRoomList = () => {
  const classes = useStyles();
  const authUser = useSelector((state) => state.auth.user);

  const { status, data, error } = useQuery("rooms", async () => {
    const res = await api.get(`/api/user/${authUser._id ? authUser._id : authUser.id}/rooms`);
    return res.data;
  });

  const { status: userStatus, data: users, error: userError } = useQuery("users", async () => {
    const res = await api.get(`/api/users?limit=20`);
    return res.data;
  });

  return (
    <Layout {...mobileTabActive}>
      {userStatus === "loading" ? (
        <>
          <HorizontalUserSkeleton />
          <HorizontalUserSkeleton />
          <HorizontalUserSkeleton />
        </>
      ) : userStatus === "error" ? (
        <span>Error: {userError.message}</span>
      ) : (
        <div
          className="activeUser__showList"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            textAlign: "center",
            padding: "20px 0",
          }}>
          {users && users?.data.map((user, i) => <HorizontalUserList user={user} key={i} />)}
        </div>
      )}

      {status === "loading" ? (
        <Grid item xs={12} sm={3}>
          <JoinRoomListSkeleton />
          <JoinRoomListSkeleton />
          <JoinRoomListSkeleton />
        </Grid>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <Container className={classes.containerRoot}>
          <Grid container>
            {data && data?.data.map((room, i) => <JoinRoomItemList room={room} key={i} />)}
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default JoinedRoomList;
