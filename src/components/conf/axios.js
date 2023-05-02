import axios from "axios";
import env from "./env";
const api = axios.create({
  baseURL: env[process.env.NODE_ENV]?.appServer,
  timeout: 100000,
  headers: {
    key: sessionStorage.getItem("auth"),
  },
});
export default api;
