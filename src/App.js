import React from "react";
import { Route, Router } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import { QueryClient, QueryClientProvider } from "react-query";

import Login from "./pages/Login";
import PublicRoomList from "./pages/room/PublicRoomList";
import ChatRoom from "./pages/ChatRoom";
import RoomDetail from "./pages/room/RoomDetail";
import RoomInfoSetting from "./pages/room/RoomInfoSetting";
import JoinedRoomList from "./pages/room/JoinedRoomList";
import Profile from "./pages/profile/Profile";
import FindNearestFriends from "./pages/friends/FindNearestFriends";
import history from "./history";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <ToastContainer />
        <Route exact path="/" component={Login} />
        <AdminRoute exact path="/chat">
          <JoinedRoomList />
        </AdminRoute>
        <AdminRoute path="/rooms">
          <PublicRoomList />
        </AdminRoute>
        <AdminRoute exact path="/chat/:roomId">
          <ChatRoom />
        </AdminRoute>
        <AdminRoute exact path="/chat/:roomId/setting">
          <RoomDetail />
        </AdminRoute>
        <AdminRoute exact path="/chat/:roomId/info">
          <RoomInfoSetting />
        </AdminRoute>
        <AdminRoute exact path="/friends">
          <FindNearestFriends />
        </AdminRoute>

        <AdminRoute path="/me">
          <Profile />
        </AdminRoute>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
