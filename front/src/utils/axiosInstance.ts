import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
