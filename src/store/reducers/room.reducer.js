import {
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOM_DETAIL_SUCCESS,
  FETCH_USER_JOINED_ROOM,
} from "../actionTypes";

const initialState = {
  publicRooms: [],
  room: {},
  joinedRooms: [],
};

export function roomReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        publicRooms: action.payload,
      };
    case FETCH_ROOM_DETAIL_SUCCESS:
      return {
        ...state,
        room: action.payload,
      };
    case FETCH_USER_JOINED_ROOM:
      return {
        ...state,
        joinedRooms: action.payload,
      };
    default:
      return state;
  }
}
