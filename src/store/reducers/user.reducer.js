import { FETCH_USERS_SUCCESS } from "../actionTypes";

const initialState = {
  users: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
