import { createReducer } from "../helpers/reducer-helper";
import * as types from "../actions/types";

export const initial_state = {};

export const nodes = createReducer(initial_state, {
  [types.FETCH_NODES_SUCCESS](state, action) {
    let path = action.payload.path;
    return {
      ...state,
      [path]: { list: action.payload.response, loading: false }
    };
  },
  [types.FETCH_NODES_REQUESTING](state, action) {
    let path = action.payload.path;
    return { ...state, [path]: { ...state[path], loading: true } };
  },
  [types.FETCH_NODES_ERROR](state, action) {
    let path = action.payload.path;
    return { ...state, [path]: { ...state[path], loading: false } };
  }
});
