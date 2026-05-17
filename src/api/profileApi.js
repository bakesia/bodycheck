import { api } from "./axiosInstance";

// 프로필 상세 메타데이터 조회 (가입일, 총 분석 횟수)
export const getProfileMetadataApi = async (userId) => {
  const response = await api.get(`/api/user/profile/${userId}`);
  return response.data;
};

// 유저 프로필 정보 수정 (닉네임, 성별, 신장, 몸무게)
export const updateProfileApi = async (profileData) => {
  const response = await api.put("/api/user/profile", profileData);
  return response.data;
};

// 비밀번호 변경
export const updatePasswordApi = async (passwordData) => {
  const response = await api.put("/api/user/password", passwordData);
  return response.data;
};

// 이력 목록 조회
export const getHistoryLogsApi = async (userId) => {
  const response = await api.get(`/api/user/history/${userId}`);
  return response.data;
};
