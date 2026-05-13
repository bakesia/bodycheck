import React, { useEffect } from "react";
import useAnalysisStore from "../../store/useAnalysisStore";

export default function Step3Loading() {
  const { setStep } = useAnalysisStore();

  useEffect(() => {
    // 1. 여기서 실제로는 백엔드 API 호출
    // 지금은 시뮬레이션을 위해 3초 뒤에 결과 페이지(Step 4)로 넘어가게 설정
    const timer = setTimeout(() => {
      setStep(4);
    }, 3000);

    // 컴포넌트가 사라질 때 타이머 청소 (메모리 누수 방지)
    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-125 space-y-12 font-sans antialiased">
      {/* 9개 사각형 매트릭스 애니메이션 */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 bg-black animate-matrix-pulse"
            style={{
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* 메인 텍스트 */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-black text-black uppercase tracking-[0.3em]">
          Analyzing...
        </h2>

        {/* 하단 로딩 바 */}
        <div className="flex justify-center">
          <div className="w-40 h-0.5 bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-black w-1/3 animate-loading-bar" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes matrix-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.4);
            opacity: 0.2;
          }
        }
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-matrix-pulse {
          animation: matrix-pulse 1.2s infinite ease-in-out;
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite linear;
        }
      `}</style>
    </div>
  );
}
