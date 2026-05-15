import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {
    id: "",
    name: "tuser",
    email: "test@test.com",
    gender: "male",
    height: "170",
    weight: "170",
    role: "user",
  },
  accessToken: "", // 토큰 필드 추가

  // 유저 정보와 토큰을 동시에 업데이트
  login: (userData, token) => {
    // 로컬 스토리지에 토큰 저장 (새로고침 대비)
    localStorage.setItem("bodycheck_token", token);
    set({ user: userData, accessToken: token });
  },

  // 로그아웃 시 데이터 싹 비우기
  logout: () => {
    localStorage.removeItem("bodycheck_token");
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
}));

export default useUserStore;
