import axios from "axios";

let BASE_URL = process.env.REACT_APP_API_URL;
let user = JSON.parse(localStorage.getItem("persist:root"))?.user;
let currentUser = user && JSON.parse(user).currentUser;
let TOKEN = currentUser?.accessToken;

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    BASE_URL = process.env.REACT_APP_API_URL;
    user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    currentUser = user && JSON.parse(user).currentUser;
    TOKEN = currentUser?.accessToken;
    resolve();
  });
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
