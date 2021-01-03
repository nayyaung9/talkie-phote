import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { roomReducer } from "./room.reducer";
import { loadingReducer } from "./loading.reducer";
import { userReducer } from "./user.reducer";

export default combineReducers({
  auth: authReducer,
  room: roomReducer,
  loading: loadingReducer,
  user: userReducer,
});
