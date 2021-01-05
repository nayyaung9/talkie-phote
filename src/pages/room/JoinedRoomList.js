/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import HorizontalUserList from "../../components/user/HorizontalUserList";
import JoinRoomItemList from "../../components/room/JoinRoomItemList";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { userActions } from "../../store/actions/user.action";
import { geolocationActions } from "../../store/actions/geolocation.action";
// get current location hook

import useCurrentLocation from "../../hooks/useCurrentLocation";

const mobileTabActive = {
  name: "chat",
};

const JoinedRoomList = () => {
  const dispatch = useDispatch();
  let location = useCurrentLocation();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const payload = {
      userId: authUser._id ? authUser._id : authUser.id,
      geolocation: location,
    };
    dispatch(roomActions.fetchUserJoinedRooms(payload.userId));
    dispatch(userActions.fetchAllUsers());
  }, [location]);

  return (
    <Layout {...mobileTabActive}>
      <HorizontalUserList />
      <JoinRoomItemList />
    </Layout>
  );
};

export default JoinedRoomList;
