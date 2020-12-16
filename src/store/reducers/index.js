import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { roomReducer } from "./room.reducer";
import { loadingReducer } from "./loading.reducer";

export default combineReducers({
  auth: authReducer,
  room: roomReducer,
  loading: loadingReducer,
});
