import userService from "../../services/userService";
import * as actionTypes from "./actionTypes";
import alertify from "alertifyjs";

export const fetchUserInit = () => {
  return {
    type: actionTypes.FETCH_USER_INIT
  };
};

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  };
};

export const fetchUserSuccess = user => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user: user
  };
};

export const fetchUserFail = error => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error
  };
};

export const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START
  };
};

export const updateUserSuccess = user => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user: user
  };
};

export const updateUserFail = error => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error: error
  };
};

export const addPhotoToUserStart = () => {
  return {
    type: actionTypes.ADD_PHOTO_TO_USER_START
  };
};

export const addPhotoToUserSuccess = user => {
  return {
    type: actionTypes.ADD_PHOTO_TO_USER_SUCCESS,
    user: user
  };
};

export const addPhotoToUserFailed = error => {
  return {
    type: actionTypes.ADD_PHOTO_TO_USER_FAIL,
    error: error
  };
};

export const deleteUserPhotoStart = () => {
  return {
    type: actionTypes.DELETE_USER_PHOTO_START
  };
};

export const deleteUserPhotoSuccess = user => {
  return {
    type: actionTypes.DELETE_USER_PHOTO_SUCCESS,
    user: user
  };
};

export const deleteUserPhotoFail = error => {
  return {
    type: actionTypes.DELETE_USER_PHOTO_FAIL,
    error: error
  };
};

export const setMainPhotoStart = () => {
  return {
    type: actionTypes.SET_MAIN_PHOTO_START
  };
};

export const setMainPhotoSuccess = user => {
  return {
    type: actionTypes.SET_MAIN_PHOTO_SUCCESS,
    user: user
  };
};

export const setMainPhotoFail = error => {
  return {
    type: actionTypes.SET_MAIN_PHOTO_FAIL,
    error: error
  };
};

export const fetchUsersInit = () => {
  return { type: actionTypes.FETCH_USERS_INIT };
};

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  };
};

export const fetchUsersSuccess = (users, pagination) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users,
    pagination: pagination
  };
};

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  };
};

//ACTIVITIE

export const addActivitieToUserStart = () => {
  return {
    type: actionTypes.ADD_ACTIVITIE_TO_USER_START
  };
};

export const addActivitieToUserSuccess = user => {
  return {
    type: actionTypes.ADD_ACTIVITIE_TO_USER_SUCCESS,
    user: user
  };
};

export const addActivitieToUserFailed = error => {
  return {
    type: actionTypes.ADD_ACTIVITIE_TO_USER_FAIL,
    error: error
  };
};

export const deleteUserActivitieStart = () => {
  return {
    type: actionTypes.DELETE_ACTIVITIE_USER_START
  };
};

export const deleteUserActivitieSuccess = user => {
  return {
    type: actionTypes.DELETE_ACTIVITIE_USER_SUCCESS,
    user: user
  };
};

export const deleteUserActivitieFail = error => {
  return {
    type: actionTypes.DELETE_ACTIVITIE_USER_FAIL,
    error: error
  };
};

export const updateActivitieStart = () => {
  return {
    type: actionTypes.UPDATE_ACTIVITIE_START
  };
};

export const updateActivitieSuccess = user => {
  return {
    type: actionTypes.UPDATE_ACTIVITIE_SUCCESS,
    user: user
  };
};

export const updateActivitieFail = error => {
  return {
    type: actionTypes.UPDATE_ACTIVITIE_FAIL,
    error: error
  };
};

export const fetchActivitiesInit = () => {
  return { type: actionTypes.FETCH_ACTIVITIES_INIT };
};

export const fetchActivitiesStart = () => {
  return {
    type: actionTypes.FETCH_ACTIVITIES_START
  };
};

export const fetchActivitiesSuccess = (activities, pagination) => {
  return {
    type: actionTypes.FETCH_ACTIVITIES_SUCCESS,
    activities: activities,
    paginationActivitie: pagination
  };
};

export const fetchActivitiesFail = error => {
  return {
    type: actionTypes.FETCH_ACTIVITIES_FAIL,
    error: error
  };
};

//funciones adicionales

export const getUser = id => {
  return async dispatch => {
    dispatch(fetchUserStart());
    try {
      const { data: user } = await userService.getUser(id);
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      dispatch(fetchUserFail(error));
      alertify.error(error.response.statusText);
    }
  };
};

export const updateUser = (id, user) => {
  return async dispatch => {
    dispatch(updateUserStart());
    try {
      await userService.updateUser(id, user);
      dispatch(updateUserSuccess(user));
    } catch (error) {
      if (error && error.response.data) {
        dispatch(updateUserFail(error.response.data));
      }
    }
  };
};

export const addPhotoToUser = (userId, photo, user) => {
  return async dispatch => {
    dispatch(addPhotoToUserStart());
    try {
      let userPhotos = [];
      userPhotos = user.photos;
      const { data: res } = await userService.addPhoto(userId, photo);
      let photoAdded = {
        id: res.id,
        url: res.url,
        description: res.description,
        dateAdded: res.dateAdded,
        isMain: res.isMain
      };
      userPhotos.push(photoAdded);
      const newUser = { ...user };
      newUser.photos = userPhotos;
      if (newUser.photos.length === 1) {
        newUser.photoUrl = photoAdded.url;
      }
      dispatch(addPhotoToUserSuccess(newUser));
    } catch (error) {
      dispatch(addPhotoToUserFailed(error));
    }
  };
};

export const deletePhoto = (userId, photoId, user) => {
  return async dispatch => {
    dispatch(deleteUserPhotoStart());
    try {
      let userPhotos = [];
      userPhotos = user.photos;

      await userService.deletePhoto(userId, photoId);

      userPhotos.splice(
        userPhotos.findIndex(p => p.id === photoId),
        1
      );
      const newUser = { ...user };
      newUser.photos = userPhotos;
      dispatch(deleteUserPhotoSuccess(newUser));
    } catch (error) {
      dispatch(deleteUserPhotoFail(error));
    }
  };
};

export const setMainPhoto = (userId, photo, user) => {
  return async dispatch => {
    dispatch(setMainPhotoStart());
    try {
      let userPhotos = [];
      userPhotos = user.photos;

      await userService.setMainPhoto(userId, photo.id);

      const currentMain = userPhotos.filter(p => p.isMain === true)[0];
      const mainIndex = userPhotos.indexOf(currentMain);
      currentMain.isMain = false;
      userPhotos[mainIndex] = currentMain;
      const newMain = userPhotos.filter(p => p.id === photo.id)[0];
      const newMainIndex = userPhotos.indexOf(newMain);
      newMain.isMain = true;
      userPhotos[newMainIndex] = newMain;
      const newUser = { ...user };
      newUser.photos = userPhotos;
      newUser.photoUrl = newMain.url;
      dispatch(setMainPhotoSuccess(newUser));
    } catch (error) {
      if (error.data) {
        dispatch(setMainPhotoFail(error.data));
      }
    }
  };
};

export const getUsers = (pageNumber, pageSize, userParams) => {
  return async dispatch => {
    dispatch(fetchUserInit());
    dispatch(fetchUserStart());
    try {
      const response = await userService.getUsers(
        pageNumber,
        pageSize,
        userParams
      );

      const users = response.data;
      const pagination = JSON.parse(response.headers.pagination);
      dispatch(fetchUsersSuccess(users, pagination));
    } catch (error) {
      dispatch(fetchUsersFail(error));
    }
  };
};

export const addActivitieToUser = (userId, activitie, user) => {
  return async dispatch => {
    dispatch(addActivitieToUserStart());
    try {
      let userActivities = [];
      userActivities = user.activities;
      const { data: res } = await userService.addActivitie(userId, activitie);
      let activitieAdded = {
        id: res.id,
        nameOfActivitie: res.nameOfActivitie,
        description: res.description,
        dateToRealize: res.dateToRealize,
        dateAdded: res.dateAdded
      };

      userActivities.push(activitieAdded);
      const newUser = { ...user };
      newUser.activities = userActivities;
      dispatch(addActivitieToUserSuccess(newUser));
    } catch (error) {
      dispatch(addActivitieToUserFailed(error));
    }
  };
};

export const updateActivitie = (userId, activitieId, user) => {
  return async dispatch => {
    dispatch(updateActivitieStart());
    try {
      await userService.updateActivitie(activitieId, userId);
      dispatch(updateActivitieSuccess(user));
    } catch (error) {
      if (error && error.response.data) {
        dispatch(updateActivitieFail(error.response.data));
      }
    }
  };
};

export const deleteActivitie = (userId, activitieId, user) => {
  return async dispatch => {
    dispatch(deleteUserActivitieStart());
    try {
      let userActivities = [];
      userActivities = user.activities;
      await userService.deleteActivitie(userId, activitieId);
      userActivities.splice(userActivities.findIndex(p => p.id == activitieId));

      const newUser = { ...user };
      newUser.activities = userActivities;
      dispatch(deleteUserActivitieSuccess(newUser));
    } catch (error) {
      dispatch(deleteUserActivitieFail(error));
    }
  };
};

export const getActivities = (pageNumber, pageSize, userActivities, userId) => {
  return async dispatch => {
    dispatch(fetchUserInit());
    dispatch(fetchUserStart());

    try {
      const response = await userService.getActivities(
        pageNumber,
        pageSize,
        userActivities,
        userId
      );
      const activities = response.data;
      const pagination = JSON.parse(response.headers.pagination);
      dispatch(fetchActivitiesSuccess(activities, pagination));
    } catch (error) {
      dispatch(fetchActivitiesFail(error));
    }
  };
};
