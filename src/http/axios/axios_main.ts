import axios from "axios";
import { VITE_APP_API_URL } from "../../config/envConfig";

const axiosMain = axios.create({
  baseURL: VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosMain;
