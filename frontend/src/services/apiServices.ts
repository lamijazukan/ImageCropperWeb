import axios from "axios";

// axios instance
const api = axios.create({
  baseURL: "http://localhost:5001/api",

  withCredentials: false,
});

// image preview
export const previewImage = async (formData: FormData) => {
  const response = await api.post("/image/preview", formData, {
    responseType: "blob",
  });
  return response.data;
};

// generate image
export const generateImage = async (formData: FormData) => {
  const response = await api.post("/image/generate", formData, {
    responseType: "blob",
  });
  return response.data;
};

// configure logo
export const configureLogo = async (formData: FormData) => {
  const response = await api.post("/config", formData);
  return response.data;
};

export default api;
