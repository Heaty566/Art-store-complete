import http from "./http";
import config from "../config/http.json";

const url = config.url + config.endPoint.user;

export async function getMe(token) {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };

  const { data } = await http
    .get(url + `/me`, configHeader)
    .catch(err => err.response);

  return data;
}

export async function getUserName(id) {
  const { data } = await http.get(url + `/${id}`).catch(err => err.response);

  return data;
}

export async function login(user) {
  const { data } = await http
    .post(url + "/login", user)
    .catch(err => err.response);
  return data;
}

export async function register(user) {
  const { data } = await http
    .post(url + "/register", user)
    .catch(err => err.response);
  return data;
}

export async function updateUser(user, token) {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };

  const { data } = await http
    .put(url + "/update", user, configHeader)
    .catch(err => err.response);
  return data;
}
