import axios from "axios"


// export const baseURL = "http://127.0.0.1:80";
export const baseURL = "https://u40jrtqib1.execute-api.us-east-1.amazonaws.com/dev";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
});

axiosInstance.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('idToken');
  config.headers.authorizationToken = token;
  return config;
});
