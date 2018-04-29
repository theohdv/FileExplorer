import { combineReducers } from "redux";
import * as nodesReducer from "./nodes";

export default combineReducers(Object.assign({}, nodesReducer));
