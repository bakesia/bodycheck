import axios from "axios";

// Zustand 스토어나 환경변수에서 베이스 URL을 동적으로 주입받도록 구성
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const requestAnalysisApi = async (mode, formData) => {
  // 모드에 따라 /api/analysis/mode1 또는 /api/analysis/mode2로 주소 설정
  const response = await axios.post(
    `${API_BASE_URL}/api/style/${mode}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
