import api from "../../api";
import { FETCH_NEARBY_FRIENDS_LIST } from "../actionTypes";

const getCurrentPosition = (payload) => async (dispatch) => {
  const { userId } = payload;
  await api.post(`/api/user/${userId}/geolocation`, payload).then((res) => {
    console.log(res);
  });
};

const findNearByFrineds = (payload) => async (dispatch, getState) => {
  const { userId } = payload;
  const { auth } = getState();
  const authUserId = auth.user._id;

  await api.get(`/api/user/${userId}/nearby/friends`, payload).then((res) => {
    const { data } = res.data;
    const results = data && data.filter((user) => user._id != authUserId);
    dispatch({ type: FETCH_NEARBY_FRIENDS_LIST, payload: results });
  });
};

export const geolocationActions = {
  getCurrentPosition,
  findNearByFrineds,
};
