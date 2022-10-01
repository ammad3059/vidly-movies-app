import http from "./httpService";
import config from "../config.json";

const userUrl = config.apiUrl + "/users";
const authUrl = config.apiUrl + "/auth";

export function register(data) {
  let postingData = {
    email: data.username,
    password: data.password,
    name: data.name,
  };
  return http.post(userUrl, postingData);
}

export function login(data) {
  let postingData = {
    email: data.username,
    password: data.password,
  };
  return http.post(authUrl, postingData);
}
