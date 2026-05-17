import axios from "axios";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL &&
    import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
  "http://localhost:8000"; // 백엔드 로컬 기본 포트로 설정

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 가로채기: 로컬스토리지에 토큰이 있다면 자동으로 모든 요청 헤더에 주입
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bodycheck_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
