import api from "../../api";
import { SAVE_USER_DATA, CASE_LOADING } from "../actionTypes";
import history from '../../history';

const authenticate = (data) => async (dispatch) => {
  const request = (payload) => dispatch({ type: CASE_LOADING, payload });

  dispatch(request(true));
  await api.post("/api/authenticate", data).then((res) => {
    const { data } = res.data;
    dispatch({ type: SAVE_USER_DATA, payload: data });
    dispatch(request(false));
    history.push('/chat')
  }).catch(err => {
    dispatch(request(false));
    console.log('Err', err);
  })
};

export const authActions = {
  authenticate,
};
