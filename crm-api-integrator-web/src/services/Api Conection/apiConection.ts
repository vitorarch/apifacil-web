import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5034",
});

export default api;