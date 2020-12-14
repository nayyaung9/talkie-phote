import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { roomReducer } from "./room.reducer";

export default combineReducers({
  auth: authReducer,
  room: roomReducer,
});
