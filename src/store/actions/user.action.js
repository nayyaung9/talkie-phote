import api from "../../api";
import { FETCH_USERS_SUCCESS, SAVE_USER_DATA } from "../actionTypes";
// import history from "../../history";

const fetchAllUsers = () => async (dispatch) => {
  await api
    .get("/api/users")
    .then((res) => {
      const { data } = res.data;

      dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log("Err", err);
    });
};

const fetchUserDetail = (id) => async (dispatch) => {
  await api
    .get(`/api/user/${id}`)
    .then((res) => {
      const { data } = res.data;

      dispatch({ type: SAVE_USER_DATA, payload: data });
    })
    .catch((err) => {
      console.log("Err", err);
    });
};

export const userActions = {
  fetchAllUsers,
  fetchUserDetail,
};
