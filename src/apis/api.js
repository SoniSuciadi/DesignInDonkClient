import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://designindonk.herokuapp.com",
});
export default api;
