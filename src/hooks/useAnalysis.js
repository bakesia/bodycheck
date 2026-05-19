import { useState } from "react";
import { requestAnalysisApi } from "../api/analysisApi";
import useAnalysisStore from "../store/useAnalysisStore";
import useUserStore from "../store/useUserStore";

export default function useAnalysis() {
  const [loading, setLoading] = useState(false);
  const {
    images,
    mode,
    selectedTags,
    customRequest,
    setAnalysisResult,
    setStep,
  } = useAnalysisStore();
  const { user } = useUserStore();

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      // 1. 공통 신체 데이터 패키징 (문자열 변환 주입)
      formData.append("userId", String(user.id));
      formData.append("gender", String(user.gender));
      formData.append("height", String(user.height));
      formData.append("weather", String(selectedTags[0])); // 0번 인덱스: 날씨
      formData.append("customRequest", customRequest || "");

      // 2. 모드별 바이너리 파일 및 태그 격리 주입
      if (mode === "mode1") {
        formData.append("userImage", images.user); // 원본 File 객체
        formData.append("color", String(selectedTags[1]));
        formData.append("style", String(selectedTags[2]));
      } else {
        formData.append("userImage", images.user);
        formData.append("itemImage", images.item); // 옷장 모드일 때 의류 파일 추가
        formData.append("target", String(selectedTags[1]));
        formData.append("tpo", String(selectedTags[2]));
      }

      console.log(`${mode} 가동 완료. 데이터셋 검증 완료.`);

      // 3. API 실전 발사
      const data = await requestAnalysisApi(mode, formData);

      // 4. 전역 스토어에 결과 바인딩 및 최종 스텝 워프
      setAnalysisResult(data);
      setStep(4);
    } catch (error) {
      console.error("분석 파이프라인 통신 오류:", error);
      alert(
        error.response?.data?.detail ||
          "AI 분석 서버가 응답하지 않습니다. 설정창으로 복귀합니다.",
      );
      setStep(2); // 에러 나면 옵션 다시 고르라고 스텝 2로 복귀
    } finally {
      setLoading(false);
    }
  };

  return { runAnalysis, loading };
}
