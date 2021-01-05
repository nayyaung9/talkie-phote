import api from "../../api";
import { FETCH_NEARBY_FRIENDS_LIST } from "../actionTypes";

const getCurrentPosition = (payload) => async (dispatch) => {
  const { userId } = payload;
  console.log(payload);
  await api.post(`/api/user/${userId}/geolocation`, payload).then((res) => {
    console.log(res);
  });
};

const findNearByFrineds = (payload) => async (dispatch) => {
  const { userId } = payload;

  await api.get(`/api/user/${userId}/nearby/friends`, payload).then((res) => {
    console.log(res);
    const { data } = res.data;
    dispatch({ type: FETCH_NEARBY_FRIENDS_LIST, payload: data });
  });
};

export const geolocationActions = {
  getCurrentPosition,
  findNearByFrineds,
};
