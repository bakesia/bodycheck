import { create } from "zustand";
import axios from "axios";

const TOKEN_KEY = "bodycheck_token";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL &&
    import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
  "http://localhost:5173";

const PROFILE_URL = `${API_BASE_URL}/api/auth/me`;

const useUserStore = create((set, get) => ({
  // 1. 상태 정의
  user: {
    id: "",
    name: "tuser",
    email: "test@test.com",
    gender: "male",
    height: "170",
    weight: "170",
    role: "user",
  },
  accessToken: localStorage.getItem(TOKEN_KEY) || "",
  isLoggedIn: !!localStorage.getItem(TOKEN_KEY), // 토큰 존재 여부로 로그인 상태 1차 판단

  // 2. 유저 정보와 토큰을 동시에 업데이트
  login: (userData, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({
      user: userData,
      accessToken: token,
      isLoggedIn: true,
    });
  },

  // 3. 로그아웃 시 데이터 싹 비우기
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
      user: {
        id: "",
        name: "",
        email: "",
        gender: "",
        height: "",
        weight: "",
        role: "user",
      },
      accessToken: "",
      isLoggedIn: false, // 로그아웃 시 false로 변경
    });
  },

  updateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData },
    })),

  // 4. 새로고침/재접속 시 세션을 복구하는 인증 초기화 함수
  initializeAuth: async () => {
    const token = get().accessToken;

    if (!token) {
      get().logout();
      return;
    }

    try {
      const response = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data.user;

      set({
        user: userData,
        accessToken: token,
        isLoggedIn: true,
      });

      console.log("세션 정보 동기화 완료:", userData.name);
    } catch (error) {
      console.error("토큰 만료 또는 서버 에러로 세션 복구 실패:", error);
      get().logout();
    }
  },
}));

export default useUserStore;
