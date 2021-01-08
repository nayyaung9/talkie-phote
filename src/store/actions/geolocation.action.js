import api from "../../api";
import { FETCH_NEARBY_FRIENDS_LIST, FETCH_NEARBY_FRIENDS_LIST_REQUEST } from "../actionTypes";

const getCurrentPosition = (payload) => async (dispatch) => {
  const { userId } = payload;
  await api.post(`/api/user/${userId}/geolocation`, payload).then((res) => {
    console.log(res);
  });
};

const findNearByFrineds = (payload) => async (dispatch, getState) => {
  const request = (payload) => dispatch({ type: FETCH_NEARBY_FRIENDS_LIST_REQUEST, payload });

  const { userId } = payload;
  const { auth } = getState();
  const authUserId = auth.user._id;

  dispatch(request(true));
  await api
    .get(`/api/user/${userId}/nearby/friends`, payload)
    .then((res) => {
      const { data } = res.data;
      dispatch(request(false));
      const results = data && data.filter((user) => user._id != authUserId);
      dispatch({ type: FETCH_NEARBY_FRIENDS_LIST, payload: results });
    })
    .catch(() => {
      dispatch(request(false));
    });
};

export const geolocationActions = {
  getCurrentPosition,
  findNearByFrineds,
};
