import axios from "axios";

const runtimeHost = window.location.hostname || "localhost";
const runtimeProtocol = window.location.protocol || "http:";

export const ASSET_BASE_URL =
  import.meta.env.VITE_ASSET_BASE_URL ||
  `${runtimeProtocol}//${runtimeHost}:5000`;

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  `${ASSET_BASE_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;