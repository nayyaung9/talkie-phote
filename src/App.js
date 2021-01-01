import React from "react";
import { Route, Router } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";

import Login from "./pages/Login";
import ChatList from "./pages/ChatList";
import ChatRoom from "./pages/ChatRoom";
import RoomDetail from "./pages/room/RoomDetail";
import JoinedRoomList from "./pages/room/JoinedRoomList";
import Profile from "./pages/profile/Profile";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Login} />
      <AdminRoute exact path="/chat">
        <ChatList />
      </AdminRoute>
      <AdminRoute exact path="/chat/:roomId">
        <ChatRoom />
      </AdminRoute>
      <AdminRoute exact path="/chat/:roomId/setting">
        <RoomDetail />
      </AdminRoute>
      <AdminRoute path="/rooms">
        <JoinedRoomList />
      </AdminRoute>
      <AdminRoute path="/me">
        <Profile />
      </AdminRoute>
    </Router>
  );
}

export default App;
