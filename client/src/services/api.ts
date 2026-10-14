import axios from "axios";

const runtimeHost = window.location.hostname || "localhost";
const runtimeProtocol = window.location.protocol || "http:";

const withoutTrailingSlash = (value: string) =>
  value.replace(/\/+$/, "");

export const API_BASE_URL = withoutTrailingSlash(
  import.meta.env.VITE_API_BASE_URL ||
    `${runtimeProtocol}//${runtimeHost}:5000/api`,
);

export const ASSET_BASE_URL = withoutTrailingSlash(
  import.meta.env.VITE_ASSET_BASE_URL ||
    new URL(API_BASE_URL).origin,
);

export const resolveAssetUrl = (assetPath: string) => {
  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  if (assetPath.startsWith("/api/")) {
    return `${ASSET_BASE_URL}${assetPath}`;
  }

  if (assetPath.startsWith("/")) {
    return assetPath;
  }

  return `${ASSET_BASE_URL}/${assetPath}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;