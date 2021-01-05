import { FETCH_USERS_SUCCESS, FETCH_NEARBY_FRIENDS_LIST } from "../actionTypes";

const initialState = {
  users: [],
  nearByFriends: [],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_NEARBY_FRIENDS_LIST:
      return {
        ...state,
        nearByFriends: action.payload,
      };
    default:
      return state;
  }
}
