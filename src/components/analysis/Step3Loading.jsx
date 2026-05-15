import React, { useEffect } from "react";
import useAnalysisStore from "../../store/useAnalysisStore";
import useUserStore from "../../store/useUserStore";
// import axios from "axios";

export default function Step3Loading() {
  const {
    setStep,
    images,
    mode,
    selectedTags,
    customRequest,
    setAnalysisResult,
  } = useAnalysisStore();
  const { user } = useUserStore();

  useEffect(() => {
    const startAnalysisProtocol = async () => {
      try {
        const formData = new FormData();

        // 1. 공통 데이터 삽입
        formData.append("userId", user.id);
        formData.append("gender", user.gender);
        formData.append("height", user.height);
        formData.append("weather", selectedTags[0]); // 날씨는 공통 0번 인덱스
        formData.append("customRequest", customRequest);

        // 2. 모드별 특화 데이터 및 엔드포인트 설정
        let endpoint = `/api/analysis/${mode}`; // /api/analysis/mode1 또는 /mode2

        if (mode === "mode1") {
          // 모드 1: 전신사진 + 색상 + 스타일
          formData.append("userImage", images.user);
          formData.append("color", selectedTags[1]);
          formData.append("style", selectedTags[2]);
        } else {
          // 모드 2: 전신사진 + 의류사진 + 타겟 + TPO
          formData.append("userImage", images.user);
          formData.append("itemImage", images.item);
          formData.append("target", selectedTags[1]);
          formData.append("tpo", selectedTags[2]);
        }

        console.log(`${mode} 가동: ${endpoint}`);
        console.log("전송 데이터:", Object.fromEntries(formData));

        // 3. 실제 API 호출
        /*
        const response = await axios.post(endpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setAnalysisResult(response.data);
        */

        // 시뮬레이션용 대기 (3초)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // 가짜 결과 데이터 세팅
        setAnalysisResult({
          mainImage: images.user, // 실제론 서버에서 준 결과 이미지 URL
          comment: "분석 결과가 성공적으로 도출되었습니다.",
        });

        setStep(4);
      } catch (error) {
        console.error("❌ 분석 서버 통신 실패:", error);
        alert("분석 도중 오류가 발생했습니다. 설정 페이지로 돌아갑니다.");
        setStep(2);
      }
    };

    startAnalysisProtocol();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-125 space-y-12 font-sans antialiased text-left">
      {/* 매트릭스 애니메이션 */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 bg-black animate-matrix-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

      <div className="text-center space-y-6">
        <h2 className="text-3xl font-black text-black uppercase tracking-[0.3em]">
          Analyzing...
        </h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Request to: {mode}
        </p>

        <div className="flex justify-center">
          <div className="w-48 h-1 bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-black w-1/3 animate-loading-bar" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes matrix-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.4); opacity: 0.2; }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-matrix-pulse { animation: matrix-pulse 1.2s infinite ease-in-out; }
        .animate-loading-bar { animation: loading-bar 1.5s infinite linear; }
      `}</style>
    </div>
  );
}
