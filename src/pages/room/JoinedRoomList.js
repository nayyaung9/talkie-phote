/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import HorizontalUserList from "../../components/user/HorizontalUserList";
import JoinRoomItemList from "../../components/room/JoinRoomItemList";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/user.action";

const mobileTabActive = {
  name: "chat",
};

const JoinedRoomList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
