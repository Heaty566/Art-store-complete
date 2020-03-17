import http from "./http";
import config from "../config/http.json";

const url = config.url + config.endPoint.image;

export async function getImages() {
  const { data } = await http.get(url + "/all");
  return data;
}
export async function getImage(imageId) {
  const { data } = await http
    .get(url + `/${imageId}`)
    .catch(err => err.response);
  return data;
}
export async function getImagesSearch(search) {
  const { data } = await http.post(url + `/search`, { search });
  return data;
}

export async function getImagesGenre(genreId) {
  const { data } = await http
    .get(url + `/genreId/${genreId}`)
    .catch(err => err.response);
  return data;
}
