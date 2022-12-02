import axios from "axios";

export const baseURL: string = "http://localhost:5000";

export default axios.create({
  baseURL,
  withCredentials: true,
});
