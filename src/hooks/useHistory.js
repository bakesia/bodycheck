import { useState } from "react";
import { getHistoryLogsApi } from "../api/profileApi";
import useUserStore from "../store/useUserStore";

export function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore();

  const fetchHistory = async () => {
    if (!user.id) return;
    setIsLoading(true);
    try {
      const data = await getHistoryLogsApi(user.id);
      setHistory(data.history || data); // 명세서 { history: [...] } 또는 배열 형태 방어벽
    } catch (error) {
      console.error("이력 데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { history, isLoading, fetchHistory };
}
