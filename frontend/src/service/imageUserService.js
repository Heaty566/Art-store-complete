import http from "./http";
import config from "../config/http.json";

const url = config.url + config.endPoint.imageUser;

export async function userGetImages(token) {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };

  const { data } = await http
    .get(url + `/all`, configHeader)
    .catch(err => err.response);

  return data;
}
export async function userAddImage(image, token) {
  const configHeader = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": token
    }
  };

  const { data } = await http
    .post(url + `/add`, image, configHeader)
    .catch(err => err.response);

  return data;
}

export async function userUpdateImage(imageId, image, token) {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };

  const { data } = await http
    .put(url + `/${imageId}`, image, configHeader)
    .catch(err => err.response);

  return data;
}

export async function userUpdateAvate() {}

export async function userDeleteImage(imageId, token) {
  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  };

  const { data } = await http
    .delete(url + `/${imageId}`, configHeader)
    .catch(err => err.response);

  return data;
}
