import api from "../../api";
import { SAVE_USER_DATA } from "../actionTypes";
import history from '../../history';

const authenticate = (data) => async (dispatch) => {
  await api.post("/api/authenticate", data).then((res) => {
    const { data } = res.data;
    dispatch({ type: SAVE_USER_DATA, payload: data });
    history.push('/chat')
  }).catch(err => {
    console.log('Err', err);
  })
};

export const authActions = {
  authenticate,
};
