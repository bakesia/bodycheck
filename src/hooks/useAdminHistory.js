// src/hooks/useAdminHistory.js
import { useState, useCallback } from "react";
import { fetchAdminHistoryApi, deleteAdminHistoryApi } from "../api/adminApi";

export default function useAdminHistory() {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadHistories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminHistoryApi();
      setHistories(data);
    } catch (err) {
      console.error("어드민 이력 목록 조회 실패:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeHistory = useCallback(async (analysisId) => {
    try {
      await deleteAdminHistoryApi(analysisId);
      // 성공 시 화면에서 즉시 제거
      setHistories((prev) =>
        prev.filter((h) => (h.request_id ?? h.id) !== analysisId),
      );
    } catch (err) {
      console.error("어드민 이력 삭제 실패:", err);
      alert(
        err.response?.data?.detail || "분석 이력 삭제 처리에 실패했습니다.",
      );
    }
  }, []);

  return { histories, isLoading, loadHistories, removeHistory };
}
