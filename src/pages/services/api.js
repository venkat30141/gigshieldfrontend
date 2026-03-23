import axios from "axios";

const API = axios.create({
  baseURL: "https://web-production-603af5.up.railway.app/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;