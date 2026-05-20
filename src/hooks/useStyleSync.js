import { useState, useCallback } from "react";
import { requestStyleSyncApi } from "../api/analysisApi";

export default function useStyleSync() {
  const [syncingIndex, setSyncingIndex] = useState(null);
  const [composedUrl, setComposedUrl] = useState(null);
  const [composeError, setComposeError] = useState(null);

  const runStyleSync = useCallback(async (item, listIndex) => {
    // 백엔드가 아이템 객체 안에 인덱스를 심어뒀으면 쓰고, 없으면 렌더링 순번(0~4)을 사용
    const serverIndex =
      item?.recommendation_index ??
      item?.result_index ??
      item?.index ??
      listIndex;

    setComposeError(null);
    setComposedUrl(null);
    setSyncingIndex(listIndex);

    try {
      // API 함수에 인덱스 하나만 토스
      const url = await requestStyleSyncApi(serverIndex);
      if (!url) throw new Error("합성 이미지 URL을 찾을 수 없습니다.");

      setComposedUrl(url);

      // 스크롤 아래로 부드럽게 이동
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    } catch (err) {
      setComposeError(
        err.response?.data?.detail ||
          err.message ||
          "합성 요청에 실패했습니다.",
      );
    } finally {
      setSyncingIndex(null);
    }
  }, []);

  return { runStyleSync, syncingIndex, composedUrl, composeError };
}
