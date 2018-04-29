import * as types from "./types";
import config from "../config/config";

export function fetchNodes(path = "") {
  return async function(dispatch, getState) {
    try {
      dispatch(fetchNodesRequesting(path));
      let response = await fetch(`${config.api_url}${path}`);
      response = await response.json();
      dispatch(fetchNodesSuccess(response, path));
      return response;
    } catch (e) {
      dispatch(fetchNodesError(path));
      throw e;
    }
  };
}

export function fetchNodesSuccess(response, path) {
  return {
    type: types.FETCH_NODES_SUCCESS,
    payload: {
      response,
      path
    }
  };
}

export function fetchNodesError(path) {
  return {
    type: types.FETCH_NODES_ERROR,
    payload: {
      path
    }
  };
}

export function fetchNodesRequesting(path) {
  return {
    type: types.FETCH_NODES_REQUESTING,
    payload: {
      path
    }
  };
}
