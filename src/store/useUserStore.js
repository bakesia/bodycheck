import { create } from "zustand";
import axios from "axios";

const TOKEN_KEY = "bodycheck_token";

// 백엔드 API 베이스 URL 설정
const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL &&
    import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")) ||
  "http://localhost:5173";

const PROFILE_URL = `${API_BASE_URL}/api/auth/me`;

const useUserStore = create((set, get) => ({
  // 상태 정의
  user: {
    id: "",
    name: "tuser",
    email: "test@test.com",
    gender: "male",
    height: "170",
    weight: "170",
    role: "user",
  },
  // 새로고침 하자마자 로컬스토리지에 토큰이 있다면 바로 1차 장착
  accessToken: localStorage.getItem(TOKEN_KEY) || "",

  // 유저 정보와 토큰을 동시에 업데이트
  login: (userData, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({ user: userData, accessToken: token });
  },

  // 로그아웃 시 데이터 싹 비우기
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
    });
  },

  updateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData },
    })),

  // 새로고침/재접속 시 세션을 복구하는 인증 초기화 함수
  //기존 accessToken을 가지고 백엔드에 내 프로필 정밀 조회를 요청
  initializeAuth: async () => {
    const token = get().accessToken;

    // 만약 들고 있는 토큰이 없다면 바로 로그아웃 털고 종료
    if (!token) {
      get().logout();
      return;
    }

    try {
      // 서버에 토큰 헤더에 실어서 유저 스펙 재요청
      const response = await axios.get(PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 백엔드가 { id, name, email, gender, height, weight, role } 을 전송
      const userData = response.data;

      // 우리 스토어 구조인 user 객체 내부에 통째로 꽂아넣기
      set({
        user: userData,
        accessToken: token,
      });

      console.log("세션 정보 동기화 완료:", userData.name);
    } catch (error) {
      console.error("토큰 만료 또는 서버 에러로 세션 복구 실패:", error);
      get().logout(); // 세션 만료 시 깔끔하게 청소
    }
  },
}));

export default useUserStore;
