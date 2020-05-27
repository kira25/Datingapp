import http from "./httpService";

const apiEndpoint = "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export function getUsers(pageNumber, pageSize, userParams) {
  let params = new URLSearchParams();

  if (pageNumber && pageSize) {
    params.append("pageNumber", pageNumber);
    params.append("pageSize", pageSize);
  }

  if (userParams) {
    params.append("minAge", userParams.minAge);
    params.append("maxAge", userParams.maxAge);
    params.append("gender", userParams.gender);
    params.append("orderBy", userParams.orderBy);
  }

  return http.get(apiEndpoint, { params });
}

export function updateUser(id, user) {
  return http.put(userUrl(id), user);
}

//photos
export function setMainPhoto(userId, id) {
  return http.post(`${userUrl(userId)}/photos/${id}/setMain`, {});
}

export function deletePhoto(userId, id) {
  return http.delete(`${userUrl(userId)}/photos/${id}`);
}

export function addPhoto(userId, photo) {
  return http.post(`${userUrl(userId)}/photos`, photo);
}

//Activities
export function getActivitie(id,userId) {
  return http.get(`${userUrl(userId)}/activitie/${id}`);
}

export function addActivitie(userId, activitie) {
  return http.post(`${userUrl(userId)}/activitie`, activitie);
}

export function updateActivitie(id,userId) {
  return http.put(`${userUrl(userId)}/activitie/${id}`);
}

export function deleteActivitie(userId, id) {
  return http.delete(`${userUrl(userId)}/activitie/${id}`);
}

export function getActivities(pageNumber, pageSize, userActivities,userId) {
  let params = new URLSearchParams();

  if (pageNumber && pageSize) {
    params.append("pageNumber", pageNumber);
    params.append("pageSize", pageSize);
  }

  if (userActivities) return http.get(`${userUrl(userId)}/activitie`, { userActivities });
}

export default {
  getUser,
  updateUser,
  setMainPhoto,
  deletePhoto,
  addPhoto,
  getUsers,
  getActivitie,
  addActivitie,
  updateActivitie,
  deleteActivitie,
  getActivities

};
