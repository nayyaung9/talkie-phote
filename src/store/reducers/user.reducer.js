import {
  FETCH_USERS_SUCCESS,
  FETCH_NEARBY_FRIENDS_LIST,
  FETCH_NEARBY_FRIENDS_LIST_REQUEST,
} from "../actionTypes";

const initialState = {
  users: [],
  nearByFriends: [],
  nearUserLoading: false,
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
    case FETCH_NEARBY_FRIENDS_LIST_REQUEST:
      return {
        ...state,
        nearUserLoading: action.payload,
      };
    default:
      return state;
  }
}
