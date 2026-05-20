import { api } from "./axiosInstance";

/** 1. 가입 유저 정보 리스트 조회 (GET) */
export const fetchAdminUsersApi = async () => {
  const response = await api.get("/api/admin/user");
  return response.data;
};

/** 2. 전체 AI 분석 이력 리스트 조회 (GET) */
export const fetchAdminHistoryApi = async () => {
  const response = await api.get("/api/admin/history");
  return response.data;
};

/** 3. 특정 유저 강제 탈퇴 (DELETE) */
export const deleteAdminUserApi = async (userId) => {
  const response = await api.delete(`/api/admin/user/${userId}`);
  return response.data;
};

/** 4. 특정 분석 이력 강제 삭제 (DELETE) */
export const deleteAdminHistoryApi = async (analysisId) => {
  const response = await api.delete(`/api/admin/history/${analysisId}`);
  return response.data;
};
