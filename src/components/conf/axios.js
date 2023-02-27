import axios from "axios";
import env from "./env";
const api =axios.create({
baseURL: env[process.env.NODE_ENV]?.appServer,
timeout: 10000,
headers:{
    key:env[process.env.NODE_ENV]?.APIKey
}
})
export default api;