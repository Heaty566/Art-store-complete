import http from "./http";
import config from "../config/http.json";

const url = config.url + config.endPoint.genre;

export async function getGenres() {
  const { data } = await http.get(url + "/all");
  return data;
}

export async function getGenre(genreId) {
  const { data } = await http.get(url + `/${genreId}`);
  return data;
}
