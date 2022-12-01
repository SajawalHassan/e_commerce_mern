import axios from "axios";

const baseURL: string = "http://localhost:5000";

export default axios.create({
  baseURL,
  withCredentials: true,
});
