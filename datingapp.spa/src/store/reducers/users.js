import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  user: null,
  users: null,
  pagination: null,
  paginationActivitie: null,
  error: null
};

const fetchUserInit = (state, action) => {
  return updateObject(state, { user: null, error: null });
};

const userProcessStart = (state, action) => {
  return updateObject(state, { error: null });
};

const userProcessSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    error: null
  });
};

const userProcessFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const fecthUsersInit = (state, action) => {
  return updateObject(state, {
    user: null,
    users: null,
    error: null,
    pagination: null
  });
};

const fetchUsersStart = (state, action) => {
  return updateObject(state, { error: null });
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    pagination: action.pagination,
    error: null
  });
};

const fetchUsersFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const fetchActivitiesInit = (state, action) => {
  return updateObject(state, {
    user: null,
    paginationActivitie: null,
    error: null,
    activities: null
  });
};

const fetchActivitiesStart = (state, action) => {
  return updateObject(state, { error: null });
};

const fetchActivitiesSuccess = (state, action) => {
  return updateObject(state, {
    activities: action.activities,
    error: null,
    paginationActivitie: action.pagination
  });
};

const fetchActivitiesFail = (state, action) => {
  return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_INIT:
      return fetchUserInit(state, action);
    case actionTypes.FETCH_USER_START:
      return userProcessStart(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.FETCH_USER_FAIL:
      return userProcessFail(state, action);

    case actionTypes.UPDATE_USER_START:
      return userProcessStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return userProcessFail(state, action);

    case actionTypes.ADD_PHOTO_TO_USER_START:
      return userProcessStart(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.ADD_PHOTO_TO_USER_FAIL:
      return userProcessFail(state, action);

    case actionTypes.DELETE_USER_PHOTO_START:
      return userProcessStart(state, action);
    case actionTypes.DELETE_USER_PHOTO_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.DELETE_USER_PHOTO_FAIL:
      return userProcessFail(state, action);

    case actionTypes.SET_MAIN_PHOTO_START:
      return userProcessStart(state, action);
    case actionTypes.SET_MAIN_PHOTO_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.SET_MAIN_PHOTO_FAIL:
      return userProcessFail(state, action);

    case actionTypes.FETCH_USERS_INIT:
      return fecthUsersInit(state, action);
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action);

    case actionTypes.ADD_ACTIVITIE_TO_USER_START:
      return userProcessStart(state, action);
    case actionTypes.ADD_ACTIVITIE_TO_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.ADD_ACTIVITIE_TO_USER_FAIL:
      return userProcessFail(state, action);

    case actionTypes.UPDATE_ACTIVITIE_START:
      return userProcessStart(state, action);
    case actionTypes.UPDATE_ACTIVITIE_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.UPDATE_ACTIVITIE_FAIL:
      return userProcessFail(state, action);

    case actionTypes.DELETE_ACTIVITIE_USER_START:
      return userProcessStart(state, action);
    case actionTypes.DELETE_ACTIVITIE_USER_SUCCESS:
      return userProcessSuccess(state, action);
    case actionTypes.DELETE_ACTIVITIE_USER_FAIL:
      return userProcessFail(state, action);

    case actionTypes.FETCH_ACTIVITIES_INIT:
      return fetchActivitiesInit(state, action);
    case actionTypes.FETCH_ACTIVITIES_START:
      return fetchActivitiesStart(state, action);
    case actionTypes.FETCH_ACTIVITIES_SUCCESS:
      return fetchActivitiesSuccess(state, action);
    case actionTypes.FETCH_ACTIVITIES_FAIL:
      return fetchActivitiesFail(state, action);

    default:
      return state;
  }
};

export default reducer;
