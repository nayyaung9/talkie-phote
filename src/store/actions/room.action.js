import api from "../../api";
import {
  CASE_LOADING,
  ALERT_STATUS,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOM_DETAIL_SUCCESS,
  FETCH_USER_JOINED_ROOM,
} from "../actionTypes";
import history from "../../history";

const createRoom = (data) => async (dispatch) => {
  const request = (payload) => dispatch({ type: CASE_LOADING, payload });

  dispatch(request(true));
  await api
    .post(`/api/room`, data)
    .then((res) => {
      const { data } = res.data;
      dispatch(request(false));
      dispatch({
        type: ALERT_STATUS,
        text: "is create successfully",
      });
      history.push(`/chat/${data.code}`);
    })
    .catch((err) => {
      dispatch(request(false));
      dispatch({
        type: ALERT_STATUS,
        text: err.response.data,
      });
    });
};

const fetchAllRooms = () => async (dispatch) => {
  const request = (payload) => dispatch({ type: CASE_LOADING, payload });

  dispatch(request(true));
  await api
    .get("/api/rooms")
    .then((res) => {
      const { data } = res.data;
      dispatch(request(false));

      dispatch({ type: FETCH_ROOMS_SUCCESS, payload: data });
    })
    .catch((err) => {
      dispatch(request(false));
      dispatch({
        type: ALERT_STATUS,
        text: err.response.data,
      });
    });
};

const fetchRoomById = (roomId) => async (dispatch) => {
  await api
    .get(`/api/room/${roomId}`)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: FETCH_ROOM_DETAIL_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log("Err", err);
    });
};

const joinRoom = (data) => async () => {
  await api
    .put(`/api/room`, data)
    .then((res) => {
      const { data } = res.data;
      history.push(`/chat/${data.code}`);
    })
    .catch((err) => {
      console.log("Err", err);
    });
};

const fetchUserJoinedRooms = (userId) => async (dispatch) => {
  await api
    .get(`/api/user/${userId}/rooms`)
    .then((res) => {
      const { data } = res.data;
      dispatch({ type: FETCH_USER_JOINED_ROOM, payload: data });
    })
    .catch((err) => {
      console.log("Err", err);
    });
};

export const roomActions = {
  createRoom,
  fetchAllRooms,
  fetchRoomById,
  joinRoom,
  fetchUserJoinedRooms,
};
