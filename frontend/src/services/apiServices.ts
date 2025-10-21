import axios from "axios";

// axios instance
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const getTestMessage = async () => {
  const response = await api.get("/");
  return response.data; // returns "Hello from Express + Swagger + TypeScript 👋"
};

export default api;
