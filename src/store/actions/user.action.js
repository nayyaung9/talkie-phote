import api from "../../api";
import { FETCH_USERS_SUCCESS } from "../actionTypes";
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

export const userActions = {
  fetchAllUsers,
};
