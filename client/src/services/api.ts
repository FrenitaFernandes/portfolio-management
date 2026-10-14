import axios from "axios";

const runtimeHost = window.location.hostname || "localhost";
const runtimeProtocol = window.location.protocol || "http:";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  `${runtimeProtocol}//${runtimeHost}:5000/api`;

export const ASSET_BASE_URL =
  import.meta.env.VITE_ASSET_BASE_URL ||
  new URL(API_BASE_URL).origin;

export const resolveAssetUrl = (assetPath: string) =>
  assetPath.startsWith("/api/")
    ? `${ASSET_BASE_URL}${assetPath}`
    : assetPath.startsWith("/")
      ? assetPath
      : `${ASSET_BASE_URL}/${assetPath}`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;