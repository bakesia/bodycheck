import { api } from "./axiosInstance";

// 회원가입 API
export const signupApi = async (formData) => {
  const payload = {
    nickname: formData.name,
    email: formData.email,
    password: formData.password,
    gender: formData.gender,
    height: Number(formData.height),
    weight: Number(formData.weight),
  };
  const response = await api.post("/api/auth/signup", payload);
  return response.data;
};

// 로그인 API (accessToken과 user 객체가 한 번에 내려옴)
export const loginApi = async (email, password) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

// 비밀번호 찾기 API (구색 맞추기용 비번 찾기 api, 패스워드 원문 리턴)
export const findPwApi = async (email) => {
  const response = await api.post("/api/auth/findpw", { email });
  return response.data; // 백엔드가 { password: "..." } 구조로 준다고 가정
};
