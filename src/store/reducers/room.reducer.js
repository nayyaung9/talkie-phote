import { FETCH_ROOMS_SUCCESS, FETCH_ROOM_DETAIL_SUCCESS } from "../actionTypes";

const initialState = {
  rooms: [],
  room: {},
};

export function roomReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
      };
    case FETCH_ROOM_DETAIL_SUCCESS:
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
}
