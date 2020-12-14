import { FETCH_ROOMS_SUCCESS } from "../actionTypes";

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
    default:
      return state;
  }
}
