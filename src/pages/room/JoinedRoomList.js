/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import HorizontalUserList from "../../components/user/HorizontalUserList";
import JoinRoomItemList from "../../components/room/JoinRoomItemList";
import { useDispatch, useSelector } from "react-redux";
import { roomActions } from "../../store/actions/room.action";
import { userActions } from "../../store/actions/user.action";
// get current location hook

const mobileTabActive = {
  name: "chat",
};

const JoinedRoomList = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const userId = authUser._id ? authUser._id : authUser.id;

    dispatch(roomActions.fetchUserJoinedRooms(userId));
    dispatch(userActions.fetchAllUsers());
  }, []);

  return (
    <Layout {...mobileTabActive}>
      <HorizontalUserList />
      <JoinRoomItemList />
    </Layout>
  );
};

export default JoinedRoomList;
