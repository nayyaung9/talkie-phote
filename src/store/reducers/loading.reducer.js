import { CASE_LOADING } from "../actionTypes";

const initialState = {
  loading: false,
};

export function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case CASE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
