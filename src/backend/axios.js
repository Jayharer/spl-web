import axios from "axios"

// export const baseURL = "http://127.0.0.1:3000";
export const baseURL = "https://tscp4f1d0k.execute-api.us-east-1.amazonaws.com/prod";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
});
