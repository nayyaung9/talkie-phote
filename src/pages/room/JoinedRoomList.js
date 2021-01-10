/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../../components/Layout";
import HorizontalUserList from "../../components/user/HorizontalUserList";
import JoinRoomItemList from "../../components/room/JoinRoomItemList";

const mobileTabActive = {
  name: "chat",
};

const JoinedRoomList = () => {
  return (
    <Layout {...mobileTabActive}>
      <HorizontalUserList />
      <JoinRoomItemList />
    </Layout>
  );
};

export default JoinedRoomList;
